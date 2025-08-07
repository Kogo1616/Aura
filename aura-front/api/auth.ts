import { API_BASE_URL } from './config';
import { RegisterRequest } from '@/types/auths/auth';
import { useAuthStore, AuthUser } from '@/stores/useAuthStore';
import {LoginApiResponse} from "@/types/auths/response/loginResponse";

export async function loginUser(email: string, password: string) {
    const res = await fetch(`${API_BASE_URL}/api/Auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(error || 'Login failed');
    }

    const data: LoginApiResponse = await res.json();

    const user: AuthUser = {
        id: data.user.id,
        name: data.user.name ?? 'User',
        email: data.user.email,
        role: data.user.role ?? 'user',
        avatar: data.user.avatar,
    };

    // Save to Zustand store
    useAuthStore.getState().login(user);

    return user;
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
