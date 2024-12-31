from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Import models after db is defined
from .student import Student
from .user import User
from .fee import Fee, FeeType, FeePayment

__all__ = ['db', 'Student', 'User', 'Fee', 'FeeType', 'FeePayment']
