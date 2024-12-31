import React, { useState } from 'react';
import { Student, StudentCreateInput } from '../../types/student';

interface FormErrors {
    [key: string]: string;
}

interface AddStudentFormProps {
    onSubmit: (data: StudentCreateInput) => Promise<void>;
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({ onSubmit }) => {
    const initialFormData: StudentCreateInput = {
        studentName: '',
        parentsName: '',
        rollNumber: '',
        class: '',
        section: '',
        schoolJoinedDate: new Date().toISOString().split('T')[0],
        dateOfBirth: '',
        phoneNumber: ''
    };

    const [formData, setFormData] = useState<StudentCreateInput>(initialFormData);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        
        if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required';
        if (!formData.parentsName.trim()) newErrors.parentsName = 'Parents name is required';
        if (!formData.rollNumber.trim()) newErrors.rollNumber = 'Roll number is required';
        if (!formData.class.trim()) newErrors.class = 'Class is required';
        if (!formData.section.trim()) newErrors.section = 'Section is required';
        if (!formData.schoolJoinedDate.trim()) newErrors.schoolJoinedDate = 'School joined date is required';
        if (!formData.dateOfBirth.trim()) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            try {
                await onSubmit(formData);
                setFormData(initialFormData);
            } catch (error) {
                console.error('Error submitting form:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const inputStyle = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm";
    const labelStyle = "block text-sm font-medium text-gray-700";
    const errorStyle = "text-red-500 text-xs mt-1";

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="studentName" className={labelStyle}>Student Name</label>
                    <input
                        id="studentName"
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleChange}
                        className={inputStyle}
                        disabled={isSubmitting}
                    />
                    {errors.studentName && <p className={errorStyle}>{errors.studentName}</p>}
                </div>

                <div>
                    <label htmlFor="parentsName" className={labelStyle}>Parents Name</label>
                    <input
                        id="parentsName"
                        type="text"
                        name="parentsName"
                        value={formData.parentsName}
                        onChange={handleChange}
                        className={inputStyle}
                        disabled={isSubmitting}
                    />
                    {errors.parentsName && <p className={errorStyle}>{errors.parentsName}</p>}
                </div>

                <div>
                    <label htmlFor="rollNumber" className={labelStyle}>Roll Number</label>
                    <input
                        id="rollNumber"
                        type="text"
                        name="rollNumber"
                        value={formData.rollNumber}
                        onChange={handleChange}
                        className={inputStyle}
                        disabled={isSubmitting}
                    />
                    {errors.rollNumber && <p className={errorStyle}>{errors.rollNumber}</p>}
                </div>

                <div>
                    <label htmlFor="class" className={labelStyle}>Class</label>
                    <input
                        id="class"
                        type="text"
                        name="class"
                        value={formData.class}
                        onChange={handleChange}
                        className={inputStyle}
                        disabled={isSubmitting}
                    />
                    {errors.class && <p className={errorStyle}>{errors.class}</p>}
                </div>

                <div>
                    <label htmlFor="section" className={labelStyle}>Section</label>
                    <input
                        id="section"
                        type="text"
                        name="section"
                        value={formData.section}
                        onChange={handleChange}
                        className={inputStyle}
                        disabled={isSubmitting}
                    />
                    {errors.section && <p className={errorStyle}>{errors.section}</p>}
                </div>

                <div>
                    <label htmlFor="schoolJoinedDate" className={labelStyle}>School Joined Date</label>
                    <input
                        id="schoolJoinedDate"
                        type="date"
                        name="schoolJoinedDate"
                        value={formData.schoolJoinedDate}
                        onChange={handleChange}
                        className={inputStyle}
                        disabled={isSubmitting}
                    />
                    {errors.schoolJoinedDate && <p className={errorStyle}>{errors.schoolJoinedDate}</p>}
                </div>

                <div>
                    <label htmlFor="dateOfBirth" className={labelStyle}>Date of Birth</label>
                    <input
                        id="dateOfBirth"
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className={inputStyle}
                        disabled={isSubmitting}
                    />
                    {errors.dateOfBirth && <p className={errorStyle}>{errors.dateOfBirth}</p>}
                </div>

                <div>
                    <label htmlFor="phoneNumber" className={labelStyle}>Phone Number</label>
                    <input
                        id="phoneNumber"
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className={inputStyle}
                        disabled={isSubmitting}
                    />
                    {errors.phoneNumber && <p className={errorStyle}>{errors.phoneNumber}</p>}
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {isSubmitting ? 'Adding...' : 'Add Student'}
                </button>
            </div>
        </form>
    );
};

export default AddStudentForm;
