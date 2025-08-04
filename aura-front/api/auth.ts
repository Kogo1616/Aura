export async function loginUser(email: string, password: string) {
    const res = await fetch('http://192.168.100.4:5020/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
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

    // Return mocked user if backend doesn't send one
    return {
        name: 'User',
        email,
        role: 'user',
    };
}

//email, password, role, firstName, lastName, phoneNumber, role === 'provider' ? skills : undefined

// api/auth.ts

type RegisterRequest = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    userName: string;
    password: string;
    role: 'user' | 'provider';
    avatarUrl: string;
    bio: string;
    skills?: number[]; // This is the fix: an optional array of skill IDs
};

export async function registerUser(request: RegisterRequest) {
    const registerRes = await fetch('http://192.168.100.4:5020/api/Auth/register', {
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
