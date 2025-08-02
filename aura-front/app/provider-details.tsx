import { useLocalSearchParams, router } from 'expo-router';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from 'react-native';
import { useMemo } from 'react';
import { useReviewStore } from '../stores/useReviewStore';
import dayjs from 'dayjs';

export default function ProviderDetails() {
    const { name, category, rating, image } = useLocalSearchParams<{
        name?: string;
        category?: string;
        rating?: string;
        image?: string;
    }>();

    const providerName = name?.toString() ?? '';
    const providerRating = rating?.toString() ?? '0';

    const allReviews = useReviewStore((state) => state.reviews);

    const reviews = useMemo(
        () => allReviews.filter((r) => r.providerName === providerName),
        [allReviews, providerName]
    );

    const avgRating = useMemo(() => {
        if (reviews.length === 0) return providerRating;
        const total = reviews.reduce((sum, r) => sum + r.rating, 0);
        return (total / reviews.length).toFixed(1);
    }, [reviews]);

    // ⏱️ Mock availability and vacation range
    const availability = [
        { day: 'Monday', from: '10:00', to: '17:00' },
        { day: 'Wednesday', from: '12:00', to: '18:00' },
        { day: 'Friday', from: '09:30', to: '16:00' },
    ];

    const vacation = {
        startDate: '2025-08-01',
        endDate: '2025-08-07',
    };

    const isOnVacation = dayjs().isAfter(vacation.startDate) && dayjs().isBefore(vacation.endDate);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />

            <Text style={styles.name}>{providerName}</Text>
            <Text style={styles.category}>{category}</Text>
            <Text style={styles.rating}>⭐ {avgRating}</Text>

            {isOnVacation && (
                <View style={styles.vacationBox}>
                    <Text style={styles.vacationText}>
                        ❌ Currently on vacation from {vacation.startDate} to {vacation.endDate}
                    </Text>
                </View>
            )}

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>📅 Availability</Text>
                {availability.map((slot, idx) => (
                    <Text key={idx} style={styles.availabilityText}>
                        {slot.day}: {slot.from} - {slot.to}
                    </Text>
                ))}
            </View>

            <TouchableOpacity
                style={styles.bookButton}
                onPress={() =>
                    router.push({
                        pathname: '/booking',
                        params: { providerName },
                    })
                }
            >
                <Text style={styles.bookText}>Book Now</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.bookButton, { marginTop: 12, backgroundColor: '#ccc' }]}
                onPress={() =>
                    router.push({
                        pathname: '/review',
                        params: { providerName },
                    })
                }
            >
                <Text style={[styles.bookText, { color: '#000' }]}>Write a Review</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>⭐ Reviews</Text>
            {reviews.length === 0 ? (
                <Text style={styles.emptyText}>No reviews yet.</Text>
            ) : (
                <FlatList
                    data={reviews}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.reviewItem}>
                            <Text style={styles.reviewRating}>⭐ {item.rating}</Text>
                            <Text>{item.comment}</Text>
                        </View>
                    )}
                />
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 220,
        borderRadius: 12,
        marginBottom: 20,
    },
    name: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
    },
    category: {
        fontSize: 16,
        color: '#777',
    },
    rating: {
        fontSize: 16,
        color: '#6A4C93',
        marginVertical: 6,
    },
    vacationBox: {
        backgroundColor: '#ffe2e2',
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
    },
    vacationText: {
        color: '#b00020',
        fontWeight: '600',
        textAlign: 'center',
    },
    section: {
        marginTop: 16,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#6A4C93',
        marginBottom: 8,
    },
    availabilityText: {
        fontSize: 15,
        color: '#333',
        marginBottom: 4,
    },
    bookButton: {
        backgroundColor: '#6A4C93',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    bookText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    emptyText: {
        fontStyle: 'italic',
        color: '#777',
    },
    reviewItem: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    reviewRating: {
        fontWeight: 'bold',
        color: '#6A4C93',
        marginBottom: 4,
    },
});
