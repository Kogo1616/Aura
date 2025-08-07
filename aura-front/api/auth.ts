import { API_BASE_URL } from './config';
import {RegisterRequest} from "@/types/auths/auth";

export async function loginUser(email: string, password: string) {
    const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            
        },
        credentials: 'include',
        body: JSON.stringify({
            email,
            password,
            twoFactorCode: '',
            twoFactorRecoveryCode: '',
        }),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(error || 'Login failed');
    }

    const data = await res.json();

    return {
        name: data.name ?? 'User',
        email: data.email ?? email,
        role: data.role ?? 'user',
    };
}

export async function registerUser(request: RegisterRequest) {
    const registerRes = await fetch(`${API_BASE_URL}/api/Auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
    });

    if (!registerRes.ok) {
        const error = await registerRes.text();
        throw new Error(error || 'Registration failed');
    }

    return {
        name: `${request.firstName} ${request.lastName}`,
        email: request.email,
        role: request.role,
    };
}
