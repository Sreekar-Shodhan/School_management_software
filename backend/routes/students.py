from flask import Blueprint, request, jsonify
from sqlalchemy import or_
from datetime import datetime
from models import db, Student
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

students_bp = Blueprint('students', __name__, url_prefix='/api')

@students_bp.route('/students', methods=['GET'])
def get_students():
    try:
        logger.debug("GET /students - Starting request")
        logger.debug(f"Request args: {request.args}")
        
        # Get query parameters
        page = request.args.get('page', 1, type=int)
        limit = min(request.args.get('limit', 10, type=int), 100)
        search = request.args.get('search', '')
        
        logger.debug(f"Query params - page: {page}, limit: {limit}, search: {search}")

        # Build query
        query = Student.query

        if search:
            logger.debug(f"Applying search filter: {search}")
            search_filter = or_(
                Student.student_name.ilike(f'%{search}%'),
                Student.roll_number.ilike(f'%{search}%'),
                Student.parents_name.ilike(f'%{search}%')
            )
            query = query.filter(search_filter)

        # Get total count
        total = query.count()
        
        # Apply pagination
        students = query.offset((page - 1) * limit).limit(limit).all()
        logger.debug(f"Found {total} total students, returning {len(students)} for current page")

        # Convert to dict
        result = {
            'data': [student.to_dict() for student in students],
            'total': total,
            'page': page,
            'limit': limit
        }
        
        logger.debug("Successfully processed GET /students request")
        return jsonify(result), 200

    except Exception as e:
        logger.error(f"Error in get_students: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 500

@students_bp.route('/students/<int:student_id>', methods=['GET'])
def get_student(student_id):
    try:
        logger.debug(f"GET /students/{student_id} - Starting request")
        student = Student.query.get_or_404(student_id)
        logger.debug(f"Found student: {student.student_name}")
        return jsonify({'data': student.to_dict()}), 200
    except Exception as e:
        logger.error(f"Error in get_student: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 500

@students_bp.route('/students', methods=['POST'])
def create_student():
    try:
        logger.debug("POST /students - Starting request")
        data = request.get_json()
        
        if not data:
            logger.error("No data provided in request")
            return jsonify({'error': 'No data provided'}), 400
            
        logger.debug(f"Request data: {data}")
        
        try:
            # Create new student using from_dict method
            student = Student.from_dict(data)
            db.session.add(student)
            db.session.commit()
            
            logger.debug(f"Created new student: {student.student_name}")
            return jsonify({
                'success': True,
                'data': student.to_dict(),
                'message': 'Student created successfully'
            }), 201
            
        except ValueError as ve:
            logger.error(f"Validation error: {str(ve)}")
            return jsonify({
                'success': False,
                'error': str(ve)
            }), 400
            
    except Exception as e:
        logger.error(f"Error in create_student: {str(e)}", exc_info=True)
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': 'Internal server error occurred'
        }), 500

@students_bp.route('/students/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    try:
        logger.debug(f"PUT /students/{student_id} - Starting request")
        logger.debug(f"Request data: {request.get_json()}")
        
        student = Student.query.get_or_404(student_id)
        data = request.get_json()
        
        # Update fields
        if 'studentName' in data:
            student.student_name = data['studentName']
        if 'parentsName' in data:
            student.parents_name = data['parentsName']
        if 'rollNumber' in data:
            student.roll_number = data['rollNumber']
        if 'class' in data:
            student.class_name = data['class']
        if 'section' in data:
            student.section = data['section']
        if 'schoolJoinedDate' in data:
            student.school_joined_date = datetime.strptime(data['schoolJoinedDate'], '%Y-%m-%d').date()
        if 'dateOfBirth' in data:
            student.date_of_birth = datetime.strptime(data['dateOfBirth'], '%Y-%m-%d').date()
        if 'phoneNumber' in data:
            student.phone_number = data['phoneNumber']
        
        db.session.commit()
        
        logger.debug(f"Updated student: {student.student_name}")
        return jsonify({'data': student.to_dict()}), 200
    except Exception as e:
        logger.error(f"Error in update_student: {str(e)}", exc_info=True)
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@students_bp.route('/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    try:
        logger.debug(f"DELETE /students/{student_id} - Starting request")
        student = Student.query.get_or_404(student_id)
        
        db.session.delete(student)
        db.session.commit()
        
        logger.debug(f"Deleted student: {student.student_name}")
        return jsonify({'message': 'Student deleted successfully'}), 200
    except Exception as e:
        logger.error(f"Error in delete_student: {str(e)}", exc_info=True)
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
