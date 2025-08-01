import { useLocalSearchParams, router } from 'expo-router';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { useMemo } from 'react';
import { useReviewStore } from '../stores/useReviewStore';

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

    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />

            <Text style={styles.name}>{providerName}</Text>
            <Text style={styles.category}>{category}</Text>
            <Text style={styles.rating}>⭐ {avgRating}</Text>

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

            <Text style={styles.reviewHeader}>Reviews</Text>
            {reviews.length === 0 ? (
                <Text>No reviews yet.</Text>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20 },
    image: { width: '100%', height: 220, borderRadius: 12, marginBottom: 20 },
    name: { fontSize: 22, fontWeight: '600', color: '#333' },
    category: { fontSize: 16, color: '#777' },
    rating: { fontSize: 16, color: '#6A4C93', marginVertical: 6 },
    bookButton: {
        backgroundColor: '#6A4C93',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    bookText: { fontSize: 16, fontWeight: '600' },
    reviewHeader: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 30,
        marginBottom: 10,
        color: '#333',
    },
    reviewItem: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    reviewRating: { fontWeight: 'bold', color: '#6A4C93', marginBottom: 4 },
});
