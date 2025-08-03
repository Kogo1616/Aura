export async function loginUser(email: string, password: string) {
    const res = await fetch('http://192.168.100.3:5020/login', {
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

export async function registerUser(email: string, password: string, role: 'user' | 'provider') {
    const registerRes = await fetch('http://192.168.100.3:5020/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password, role}),
    });

    if (!registerRes.ok) {
        const error = await registerRes.text();
        throw new Error(error || 'Registration failed');
    }

    return {
        name: 'User',
        email,
        role,
    };
}

export async function fetchProviders(): Promise<ProviderDto[]> {
    const res = await fetch('http://192.168.100.3:5020/api/Provider/providers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch providers');
    }

    return res.json();
}

export type ProviderDto = {
    id: string;
    userName: string;
};

