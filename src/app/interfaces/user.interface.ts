export type userRole = 'admin' | 'user';

export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    role: userRole;
    appointment: [];
}