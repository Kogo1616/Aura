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
} from 'react-native';
import { router } from 'expo-router';
import CustomHeader from '../../components/CustomHeader';

type Provider = {
    id: string;
    name: string;
    category: string;
    rating: number;
    image: string;
};

export default function HomeScreen() {
    const [providers, setProviders] = useState<Provider[]>([]);
    const [filtered, setFiltered] = useState<Provider[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const res = await fetch('http://192.168.100.3:5020/api/User');
                const data = await res.json();

                const mapped = data.map((user: any, i: number) => ({
                    id: user.id,
                    name: user.userName,
                    category: i % 3 === 0 ? 'Hair Stylist' : i % 3 === 1 ? 'Massage Therapist' : 'Makeup Artist',
                    rating: +(4 + Math.random()).toFixed(1),
                    image: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i}.jpg`,
                }));

                setProviders(mapped);
                setFiltered(mapped);
            } catch (e) {
                console.warn('Fetch failed', e);
            } finally {
                setLoading(false);
            }
        };

        fetchProviders();
    }, []);

    const handleSearch = (text: string) => {
        setSearch(text);
        const filteredData = providers.filter((p) =>
            p.category.toLowerCase().includes(text.toLowerCase())
        );
        setFiltered(filteredData);
    };

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
            <CustomHeader value={search} onChangeText={handleSearch} />
            <Text style={styles.sectionTitle}>Featured Services</Text>

            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSelect(item)} style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.avatar} />
                        <View style={styles.info}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.category}>{item.category}</Text>
                        </View>
                        <Text style={styles.rating}>{item.rating.toFixed(1)}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
        marginHorizontal: 16,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 12,
        marginHorizontal: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    info: {
        flex: 1,
        marginLeft: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
    },
    category: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    rating: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6A4C93',
    },
});
