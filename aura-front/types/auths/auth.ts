export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    userName: string;
    password: string;
    role: 'user' | 'provider';
    avatarUrl: string;
    bio: string;
    skills?: number[];
};