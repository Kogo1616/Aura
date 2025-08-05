import {API_BASE_URL} from './config';

export interface Skill {
    id: number;
    name: string;
}

export async function fetchSkills(): Promise<Skill[]> {
    const res = await fetch(`${API_BASE_URL}/api/Provider/get-skills`);

    if (!res.ok) {
        throw new Error('Failed to fetch skills');
    }

    const data = await res.json();
    // Ensure the response matches our Skill interface
    return data.map((item: any) => ({
        id: item.id,
        name: item.name
    }));
}

export type RegisterRequest = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    userName: string;
    password: string;
    role: 'user' | 'provider';
    avatarUrl: string;
    bio: string;
    skills?: number[]; // Array of skill IDs
};

export async function fetchProviders(): Promise<ProviderDto[]> {
    const res = await fetch(`${API_BASE_URL}/api/Provider/providers`, {
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
    fullName: string;
    email: string;
    avatarUrl: string;
    phoneNumber: string;
};

