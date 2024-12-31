from marshmallow import Schema, fields, validate

class RegistrationSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=8))
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    role = fields.Str(required=True, validate=validate.OneOf(['student', 'teacher', 'admin']))

def validate_registration_input(data):
    schema = RegistrationSchema()
    return schema.load(data)
