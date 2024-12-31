import React, { useEffect, useState } from 'react';
import { Fee, FeeType } from '../interfaces/Fee';
import axios from 'axios';

// API base URL
const API_BASE_URL = 'http://localhost:5000/api';

const FeePage: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [feeTypes, setFeeTypes] = useState<FeeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddFeeModal, setShowAddFeeModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/students`);
      setStudents(response.data.data);
      // Fetch fees for each student
      response.data.data.forEach((student: any) => {
        fetchStudentFees(student.id);
      });
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchFeeTypes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/fee-types`);
      setFeeTypes(response.data.fee_types);
    } catch (error) {
      console.error('Error fetching fee types:', error);
    }
  };

  const fetchStudentFees = async (studentId: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/students/${studentId}/fees`);
      setStudents(prev => 
        prev.map(student => 
          student.id === studentId 
            ? { ...student, fees: response.data.fees }
            : student
        )
      );
    } catch (error) {
      console.error(`Error fetching fees for student ${studentId}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchStudents();
      await fetchFeeTypes();
    };
    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Student Fees</h1>
        <button 
          onClick={() => setShowAddFeeModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors"
        >
          Add New Fee
        </button>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <div className="space-y-6">
          {students.map(student => (
            <div key={student.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">
                  {student.studentName} - {student.rollNumber} (Class: {student.class})
                </h2>
              </div>
              
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Academic Year</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Payment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {student.fees?.map((fee: Fee) => (
                        <tr key={fee.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {fee.fee_type_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {fee.academic_year}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(fee.total_amount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(fee.total_paid)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(fee.remaining_amount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {fee.payments.length > 0 
                              ? formatDate(fee.payments[0].payment_date)
                              : 'No payments'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button className="text-blue-600 hover:text-blue-900 border border-blue-600 hover:border-blue-900 px-3 py-1 rounded-md transition-colors">
                              Add Payment
                            </button>
                            <button className="text-purple-600 hover:text-purple-900 border border-purple-600 hover:border-purple-900 px-3 py-1 rounded-md transition-colors">
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                      {(!student.fees || student.fees.length === 0) && (
                        <tr>
                          <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                            No fees found for this student
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TODO: Add modals for adding new fees and payments */}
    </div>
  );
};

export default FeePage;
