export type RootStackParamList = {
    Main: undefined;
    ProviderDetails: {
        name: string;
        image: string;
        category: string;
        rating: number;
    };
    Booking: {
        providerName: string;
    };
};
