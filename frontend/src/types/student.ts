export interface Student {
    id: number;
    studentName: string;
    parentsName: string;
    rollNumber: string;
    class: string;
    section: string;
    schoolJoinedDate: string;
    dateOfBirth: string;
    phoneNumber: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface StudentCreateInput extends Omit<Student, 'id' | 'createdAt' | 'updatedAt'> {}

export interface StudentUpdateInput extends Partial<StudentCreateInput> {
    id: number;
}

export interface StudentResponse {
    success: boolean;
    data?: Student;
    message?: string;
    error?: string;
}

export interface StudentsListResponse {
    success: boolean;
    data?: Student[];
    message?: string;
    error?: string;
    total?: number;
    page?: number;
    limit?: number;
}