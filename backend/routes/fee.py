from flask import Blueprint, request, jsonify
from models import db, Fee, FeeType, FeePayment, Student
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

fee_bp = Blueprint('fee', __name__, url_prefix='/api')

@fee_bp.route('/fee-types', methods=['GET'])
def get_fee_types():
    try:
        logger.debug("GET /api/fee-types - Starting request")
        fee_types = FeeType.query.all()
        logger.debug(f"Found {len(fee_types)} fee types")
        return jsonify({'fee_types': [ft.to_dict() for ft in fee_types]}), 200
    except Exception as e:
        logger.error(f"Error in get_fee_types: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 500

@fee_bp.route('/fee-types', methods=['POST'])
def create_fee_type():
    try:
        logger.debug("POST /api/fee-types - Starting request")
        logger.debug(f"Request data: {request.get_json()}")
        
        data = request.get_json()
        new_fee_type = FeeType(
            name=data['name'],
            description=data.get('description')
        )
        db.session.add(new_fee_type)
        db.session.commit()
        
        logger.debug(f"Created new fee type: {new_fee_type.name}")
        return jsonify({'fee_type': new_fee_type.to_dict()}), 201
    except Exception as e:
        logger.error(f"Error in create_fee_type: {str(e)}", exc_info=True)
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@fee_bp.route('/students/<int:student_id>/fees', methods=['GET'])
def get_student_fees(student_id):
    try:
        logger.debug(f"GET /api/students/{student_id}/fees - Starting request")
        student = Student.query.get_or_404(student_id)
        logger.debug(f"Found student: {student.name}")
        
        fees = Fee.query.filter_by(student_id=student_id).all()
        logger.debug(f"Found {len(fees)} fees for student")
        
        fee_details = []
        for fee in fees:
            payments = FeePayment.query.filter_by(fee_id=fee.id).all()
            total_paid = sum(payment.amount for payment in payments)
            remaining = fee.total_amount - total_paid
            
            fee_dict = fee.to_dict()
            fee_dict.update({
                'total_paid': total_paid,
                'remaining_amount': remaining,
                'fee_type': fee.fee_type.to_dict() if fee.fee_type else None,
                'payments': [payment.to_dict() for payment in payments]
            })
            fee_details.append(fee_dict)
        
        return jsonify({'fees': fee_details}), 200
    except Exception as e:
        logger.error(f"Error in get_student_fees: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 500

@fee_bp.route('/students/<int:student_id>/fees', methods=['POST'])
def create_fee(student_id):
    try:
        logger.debug(f"POST /api/students/{student_id}/fees - Starting request")
        logger.debug(f"Request data: {request.get_json()}")
        
        student = Student.query.get_or_404(student_id)
        data = request.get_json()
        
        new_fee = Fee(
            student_id=student_id,
            fee_type_id=data['fee_type_id'],
            total_amount=data['total_amount'],
            academic_year=data.get('academic_year', '2023-2024')  # Default academic year
        )
        
        db.session.add(new_fee)
        db.session.commit()
        
        logger.debug(f"Created new fee for student {student.name}")
        return jsonify({'fee': new_fee.to_dict()}), 201
    except Exception as e:
        logger.error(f"Error in create_fee: {str(e)}", exc_info=True)
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@fee_bp.route('/fees/<int:fee_id>/payments', methods=['POST'])
def add_payment(fee_id):
    try:
        logger.debug(f"POST /api/fees/{fee_id}/payments - Starting request")
        logger.debug(f"Request data: {request.get_json()}")
        
        fee = Fee.query.get_or_404(fee_id)
        data = request.get_json()
        
        # Calculate total paid so far
        total_paid = sum(payment.amount for payment in fee.payments)
        if total_paid + data['amount'] > fee.total_amount:
            return jsonify({'error': 'Payment amount exceeds remaining fee amount'}), 400
        
        new_payment = FeePayment(
            fee_id=fee_id,
            amount=data['amount'],
            payment_date=data.get('payment_date'),
            payment_method=data.get('payment_method', 'cash'),
            remarks=data.get('remarks', '')
        )
        
        db.session.add(new_payment)
        db.session.commit()
        
        logger.debug(f"Added payment of {new_payment.amount} to fee {fee_id}")
        return jsonify({'payment': new_payment.to_dict()}), 201
    except Exception as e:
        logger.error(f"Error in add_payment: {str(e)}", exc_info=True)
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
