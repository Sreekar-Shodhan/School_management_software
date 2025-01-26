// Base Student type with optional fields for form handling
export interface StudentBase {
    studentName: string;
    parentsName: string;
    rollNumber: string;
    class: string;
    section: string;
    schoolJoinedDate: string;
    dateOfBirth: string;
    phoneNumber: string;
}

// Complete Student type with all fields
export interface Student extends StudentBase {
    id: number;
    createdAt?: string;
    updatedAt?: string;
}

// Input type for creating new students
export type StudentCreateInput = StudentBase;

// Input type for updating students
export interface StudentUpdateInput extends StudentBase {
    id: number;
}

// Form data type that makes all fields optional for handling form state
export type StudentFormData = Partial<StudentUpdateInput>;

// API Response types
interface BaseResponse {
    success: boolean;
    error?: string;
    message?: string;
}

export interface StudentResponse extends BaseResponse {
    data: Student;
}

export interface StudentsListResponse extends BaseResponse {
    data: Student[];
    total: number;
    page: number;
    limit: number;
}
