import { create } from 'zustand';

type Booking = {
    id: string;
    providerName: string;
    date: string;
    time: string;
};

type BookingStore = {
    bookings: Booking[];
    addBooking: (booking: Booking) => void;
};

export const useBookingStore = create<BookingStore>((set) => ({
    bookings: [],
    addBooking: (booking) =>
        set((state) => ({
            bookings: [...state.bookings, booking],
        })),
}));
