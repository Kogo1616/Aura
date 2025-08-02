import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import { router } from 'expo-router';

type Provider = {
    id: string;
    name: string;
    category: string;
    rating: number;
    image: string;
};

const providers: Provider[] = Array.from({ length: 30 }).map((_, i) => ({
    id: `${i + 1}`,
    name: `Provider ${i + 1}`,
    category: i % 3 === 0 ? 'Makeup Artist' : i % 3 === 1 ? 'Hair Stylist' : 'Nail Specialist',
    rating: +(4 + Math.random()).toFixed(1), // Random rating between 4.0 and 5.0
    image: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i}.jpg`,
}));

export default function HomeScreen() {
    const handleSelect = (item: Provider) => {
        router.push({
            pathname: '../provider-details',
            params: {
                name: item.name,
                category: item.category,
                rating: item.rating.toString(),
                image: item.image,
            },
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Find your beauty expert</Text>
            <FlatList
                data={providers}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSelect(item)} style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={styles.info}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.category}>{item.category}</Text>
                            <Text style={styles.rating}>⭐ {item.rating}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 16,
        color: '#6A4C93',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom: 14,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 12,
    },
    info: {
        marginLeft: 12,
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    category: {
        color: '#777',
        fontSize: 14,
        marginTop: 2,
    },
    rating: {
        color: '#6A4C93',
        fontSize: 14,
        marginTop: 4,
    },
});
