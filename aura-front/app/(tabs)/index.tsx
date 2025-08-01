// app/(tabs)/home.tsx

import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const providers = [
    {
        id: '1',
        name: 'Anna Makeup',
        category: 'Makeup Artist',
        rating: 4.8,
        image: 'https://via.placeholder.com/100',
    },
    {
        id: '2',
        name: 'Sophie Hair',
        category: 'Hair Stylist',
        rating: 4.6,
        image: 'https://via.placeholder.com/100',
    },
];

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Find your beauty expert</Text>
            <FlatList
                data={providers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            router.push({
                                pathname: '../provider-details',
                                params: {
                                    name: item.name,
                                    category: item.category,
                                    rating: item.rating.toString(),
                                    image: item.image,
                                },
                            })
                        }
                    >
                        <View style={styles.card}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={{ marginLeft: 12 }}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.category}>{item.category}</Text>
                                <Text style={styles.rating}>⭐ {item.rating}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 22, fontWeight: '600', marginBottom: 12, color: '#333' },
    card: {
        flexDirection: 'row',
        marginBottom: 16,
        padding: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        alignItems: 'center',
    },
    image: { width: 60, height: 60, borderRadius: 12 },
    name: { fontWeight: '600', fontSize: 16 },
    category: { color: '#777' },
    rating: { color: '#6A4C93', marginTop: 4 },
});
