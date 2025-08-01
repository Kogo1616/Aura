import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useBookingStore } from '../../stores/useBookingStore';

export default function BookingsScreen() {
    const bookings = useBookingStore((state) => state.bookings);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Appointments</Text>

            {bookings.length === 0 ? (
                <Text style={styles.empty}>No bookings yet.</Text>
            ) : (
                <FlatList
                    data={bookings}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.bookingItem}>
                            <Text style={styles.provider}>{item.providerName}</Text>
                            <Text style={styles.details}>
                                {item.date} at {item.time}
                            </Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 16 },
    title: { fontSize: 22, fontWeight: '600', marginBottom: 16, color: '#333' },
    empty: { color: '#999', fontSize: 16 },
    bookingItem: {
        backgroundColor: '#f9f5ff',
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
    },
    provider: { fontSize: 16, fontWeight: '500', color: '#6A4C93' },
    details: { fontSize: 14, color: '#555' },
});
