import {API_BASE_URL} from './config';
import {Provider, Providers, Skill} from "@/types/providers/Providers";

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

export async function fetchProviders(): Promise<Provider[]> {
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

export async function fetchProviderDetails(providerId: any): Promise<Providers> {
    const res = await fetch(`${API_BASE_URL}/api/Provider/get-provider-details?providerId=${providerId}`);

    if (!res.ok) {
        throw new Error('Failed to fetch provider details');
    }

    return res.json();
}