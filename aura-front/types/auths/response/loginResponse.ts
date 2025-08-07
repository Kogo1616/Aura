export type LoginApiResponse = {
    tokenType: string;
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
        avatar?: string;
    };
};
