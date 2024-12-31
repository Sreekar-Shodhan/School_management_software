from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    get_jwt
)
from datetime import datetime, timedelta
from app.models.user import User
from app import db

bp = Blueprint('auth', __name__)

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Missing email or password'}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not user.check_password(data['password']):
        return jsonify({'message': 'Invalid email or password'}), 401
    
    if not user.is_active:
        return jsonify({'message': 'Account is deactivated'}), 401
    
    # Update last login
    user.last_login = datetime.utcnow()
    db.session.commit()
    
    # Create tokens
    access_token = create_access_token(
        identity=user.id,
        additional_claims={
            'email': user.email,
            'role': user.role,
            'first_name': user.first_name,
            'last_name': user.last_name
        }
    )
    refresh_token = create_refresh_token(identity=user.id)
    
    return jsonify({
        'access_token': access_token,
        'refresh_token': refresh_token,
        'user': user.to_dict()
    }), 200

@bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if not user or not user.is_active:
        return jsonify({'message': 'User not found or inactive'}), 401
    
    access_token = create_access_token(
        identity=user.id,
        additional_claims={
            'email': user.email,
            'role': user.role,
            'first_name': user.first_name,
            'last_name': user.last_name
        }
    )
    
    return jsonify({'access_token': access_token}), 200

@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    required_fields = ['email', 'password', 'first_name', 'last_name', 'role']
    for field in required_fields:
        if field not in data:
            return jsonify({'message': f'Missing {field}'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already registered'}), 400
    
    user = User(
        email=data['email'],
        first_name=data['first_name'],
        last_name=data['last_name'],
        role=data['role']
    )
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'User registered successfully'}), 201

@bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    return jsonify(user.to_dict()), 200

@bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # In a real application, you might want to blacklist the token here
    return jsonify({'message': 'Successfully logged out'}), 200
