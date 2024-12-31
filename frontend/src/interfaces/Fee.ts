export interface FeeType {
    id: number;
    name: string;
    description: string | null;
    created_at: string;
    updated_at: string | null;
}

export interface FeePayment {
    id: number;
    fee_id: number;
    amount_paid: number;
    payment_date: string;
    payment_method: string;
    remarks: string | null;
    created_at: string;
    updated_at: string | null;
}

export interface Fee {
    id: number;
    student_id: number;
    fee_type_id: number;
    fee_type_name: string;
    total_amount: number;
    total_paid: number;
    remaining_amount: number;
    academic_year: string;
    student_name: string;
    roll_number: string;
    class_name: string;
    payments: FeePayment[];
    created_at: string;
    updated_at: string | null;
}
