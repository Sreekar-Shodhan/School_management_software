import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentServices } from '../../services/studentServices';
import { StudentCreateInput } from '../../types/student';
import AddStudentForm from '../../components/students/AddStudentForm';

const StudentRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const handleSubmit = async (formData: StudentCreateInput) => {
    try {
      const response = await studentServices.createStudent(formData);
      if (response.success) {
        navigate('/students');
      } else {
        setError(response.error || 'Failed to create student');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error creating student:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Add New Student</h1>
          <button
            onClick={() => navigate('/students')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Back to List
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <AddStudentForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default StudentRegistration;
