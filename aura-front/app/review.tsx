import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useReviewStore } from '../stores/useReviewStore';
import uuid from 'react-native-uuid';

export default function ReviewScreen() {
    const { providerName } = useLocalSearchParams<{ providerName: string }>();
    const [rating, setRating] = useState('5');
    const [comment, setComment] = useState('');
    const addReview = useReviewStore((s) => s.addReview);

    const handleSubmit = () => {
        if (!rating || !comment) {
            Alert.alert('Please fill out all fields');
            return;
        }

        addReview({
            id: uuid.v4().toString(),
            providerName,
            rating: parseFloat(rating),
            comment,
        });

        Alert.alert('Thank you!', 'Your review has been submitted.', [
            { text: 'OK', onPress: () => router.back() },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Leave a Review for {providerName}</Text>

            <Text style={styles.label}>Rating (1–5):</Text>
            <TextInput
                keyboardType="numeric"
                style={styles.input}
                value={rating}
                onChangeText={setRating}
                maxLength={1}
            />

            <Text style={styles.label}>Comment:</Text>
            <TextInput
                style={[styles.input, { height: 100 }]}
                value={comment}
                onChangeText={setComment}
                multiline
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit Review</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20 },
    title: { fontSize: 20, fontWeight: '600', marginBottom: 20 },
    label: { fontSize: 16, marginBottom: 6 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#6A4C93',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
