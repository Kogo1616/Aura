export interface Providers {
    id: string;
    fullName: string;
    email: string;
    avatarUrl: string;
    phoneNumber: string;
    location: string;
    isAvaliable: boolean;
    bio: string;
    skills: string[];
}

export type Provider = {
    id: string;
    fullName: string;
    email: string;
    avatarUrl: string;
    phoneNumber: string;
};

export interface Skill {
    id: number;
    name: string;
}