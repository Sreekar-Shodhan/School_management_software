import axios from 'axios';
import { Student, StudentCreateInput, StudentUpdateInput, StudentResponse, StudentsListResponse } from '../interfaces/Student';

const API_URL = 'http://localhost:8080/api';

// Configure axios defaults
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});

const logAxiosError = (error: any) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response error data:', error.response.data);
        console.error('Response error status:', error.response.status);
        console.error('Response error headers:', error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        console.error('Request error:', error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
    }
    console.error('Error config:', error.config);
};

export const studentServices = {
    // Create a new student
    async createStudent(student: StudentCreateInput): Promise<StudentResponse> {
        try {
            console.log('Creating student with data:', student);
            const response = await axiosInstance.post('/students', student);
            console.log('Create student response:', response.data);
            return response.data;
        } catch (error: any) {
            console.error('Error creating student:', error.response?.data || error.message);
            throw error;
        }
    },

    // Get all students with pagination
    async getStudents(page: number = 1, limit: number = 10): Promise<StudentsListResponse> {
        try {
            console.log('Getting students with pagination, page:', page, 'limit:', limit);
            console.log('API URL:', `${API_URL}/students`);
            const response = await axiosInstance.get('/students', {
                params: { page, limit }
            });
            console.log('Get students response:', response.data);
            return response.data;
        } catch (error: any) {
            console.error('Error fetching students:', error.response?.data || error.message);
            throw error;
        }
    },

    // Get a single student by ID
    async getStudentById(id: number): Promise<StudentResponse> {
        try {
            console.log('Getting student by ID:', id);
            const response = await axiosInstance.get(`/students/${id}`);
            console.log('Get student by ID response:', response.data);
            return response.data;
        } catch (error: any) {
            console.error('Error fetching student:', error.response?.data || error.message);
            throw error;
        }
    },

    // Update a student
    async updateStudent(student: StudentUpdateInput): Promise<StudentResponse> {
        try {
            console.log('Updating student with data:', student);
            const response = await axiosInstance.put(`/students/${student.id}`, student);
            console.log('Update student response:', response.data);
            return response.data;
        } catch (error: any) {
            console.error('Error updating student:', error.response?.data || error.message);
            throw error;
        }
    },

    // Delete a student
    async deleteStudent(id: number): Promise<StudentResponse> {
        try {
            console.log('Deleting student with ID:', id);
            const response = await axiosInstance.delete(`/students/${id}`);
            console.log('Delete student response:', response.data);
            return response.data;
        } catch (error: any) {
            console.error('Error deleting student:', error.response?.data || error.message);
            throw error;
        }
    }
};