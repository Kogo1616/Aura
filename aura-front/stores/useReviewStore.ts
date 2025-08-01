import { create } from 'zustand';

export type Review = {
    id: string;
    providerName: string;
    rating: number;
    comment: string;
};

type ReviewStore = {
    reviews: Review[];
    addReview: (review: Review) => void;
};

export const useReviewStore = create<ReviewStore>((set) => ({
    reviews: [],
    addReview: (review) =>
        set((state) => ({
            reviews: [...state.reviews, review],
        })),
}));
