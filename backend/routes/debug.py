from flask import Blueprint, jsonify

debug_bp = Blueprint('debug', __name__)

@debug_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

# Export the blueprint
__all__ = ['debug_bp']
