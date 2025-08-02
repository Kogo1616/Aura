// app/(tabs)/home.tsx

import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { router } from 'expo-router';

type Provider = {
    id: string;
    name: string;
    category: string;
    rating: number;
    image: string;
};

export default function HomeScreen() {
    const [providers, setProviders] = useState<Provider[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await fetch('http://192.168.100.3:5020/api/User');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }

                const data = await response.json();

                // Convert backend users to Provider format
                const mapped = data.map((user: any, i: number) => ({
                    id: user.id,
                    name: user.userName,
                    category: 'Beauty Expert', // Default category
                    rating: +(4 + Math.random()).toFixed(1),
                    image: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i}.jpg`,
                }));

                setProviders(mapped);
            } catch (error: any) {
                Alert.alert('Error', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProviders();
    }, []);

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

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#6A4C93" />
            </View>
        );
    }

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
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
