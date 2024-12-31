from datetime import datetime
from models import db

class Student(db.Model):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    student_name = db.Column(db.String(100), nullable=False)
    parents_name = db.Column(db.String(100), nullable=False)
    roll_number = db.Column(db.String(20), unique=True, nullable=False)
    class_name = db.Column(db.String(20), nullable=False)
    section = db.Column(db.String(10), nullable=False)
    school_joined_date = db.Column(db.Date, nullable=False)
    date_of_birth = db.Column(db.Date, nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    
    # Timestamps
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'studentName': self.student_name,
            'parentsName': self.parents_name,
            'rollNumber': self.roll_number,
            'class': self.class_name,
            'section': self.section,
            'schoolJoinedDate': self.school_joined_date.isoformat() if self.school_joined_date else None,
            'dateOfBirth': self.date_of_birth.isoformat() if self.date_of_birth else None,
            'phoneNumber': self.phone_number,
            'createdAt': self.created_at.isoformat() if self.created_at else None,
            'updatedAt': self.updated_at.isoformat() if self.updated_at else None
        }

    @staticmethod
    def from_dict(data):
        return Student(
            student_name=data.get('studentName'),
            parents_name=data.get('parentsName'),
            roll_number=data.get('rollNumber'),
            class_name=data.get('class'),
            section=data.get('section'),
            school_joined_date=datetime.strptime(data.get('schoolJoinedDate'), '%Y-%m-%d').date() if data.get('schoolJoinedDate') else None,
            date_of_birth=datetime.strptime(data.get('dateOfBirth'), '%Y-%m-%d').date() if data.get('dateOfBirth') else None,
            phone_number=data.get('phoneNumber')
        )
