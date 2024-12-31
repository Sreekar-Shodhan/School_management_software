from datetime import datetime
from models import db

class FeeType(db.Model):
    __tablename__ = 'fee_types'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    description = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class Fee(db.Model):
    __tablename__ = 'fees'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    fee_type_id = db.Column(db.Integer, db.ForeignKey('fee_types.id'), nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    academic_year = db.Column(db.String(9), nullable=False)  # Format: 2023-2024
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    # Relationships
    student = db.relationship('Student', backref=db.backref('fees', lazy=True))
    fee_type = db.relationship('FeeType', backref=db.backref('fees', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'student_id': self.student_id,
            'fee_type_id': self.fee_type_id,
            'fee_type_name': self.fee_type.name,
            'total_amount': self.total_amount,
            'academic_year': self.academic_year,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class FeePayment(db.Model):
    __tablename__ = 'fee_payments'

    id = db.Column(db.Integer, primary_key=True)
    fee_id = db.Column(db.Integer, db.ForeignKey('fees.id'), nullable=False)
    amount_paid = db.Column(db.Float, nullable=False)
    payment_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    payment_method = db.Column(db.String(50))  # cash, card, bank transfer, etc.
    remarks = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    # Relationship
    fee = db.relationship('Fee', backref=db.backref('payments', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'fee_id': self.fee_id,
            'amount_paid': self.amount_paid,
            'payment_date': self.payment_date.isoformat() if self.payment_date else None,
            'payment_method': self.payment_method,
            'remarks': self.remarks,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
