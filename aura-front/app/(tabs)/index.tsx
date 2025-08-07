import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import {router} from 'expo-router';
import {fetchProviders} from '../../api/provider';
import {Provider} from "@/types/providers/Providers";

type ProviderResponse = {
    id: string;
    name: string;
    category: string;
    rating: number;
    image: string;
};

export default function HomeScreen() {
    const [providers, setProviders] = useState<ProviderResponse[]>([]);
    const [filtered, setFiltered] = useState<ProviderResponse[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProviders = async () => {
            try {
                const data = await fetchProviders();

                const mapped = data.map((user: Provider, i: number) => ({
                    id: user.id,
                    name: user.fullName,
                    category:
                        i % 3 === 0
                            ? 'Hair Stylist'
                            : i % 3 === 1
                                ? 'Massage Therapist'
                                : 'Makeup Artist',
                    rating: +(4 + Math.random()).toFixed(1),
                    image:
                        user.avatarUrl?.startsWith('http') ||
                        user.avatarUrl?.startsWith('file')
                            ? user.avatarUrl
                            : `https://randomuser.me/api/portraits/${
                                i % 2 === 0 ? 'women' : 'men'
                            }/${i}.jpg`,
                }));

                setProviders(mapped);
                setFiltered(mapped);
            } catch (e) {
                console.warn(e);
            } finally {
                setLoading(false);
            }
        };

        loadProviders();
    }, []);

    const handleSearch = (text: string) => {
        setSearch(text);
        const filteredData = providers.filter((p) =>
            p.category.toLowerCase().includes(text.toLowerCase())
        );
        setFiltered(filteredData);
    };

    const handleSelect = (item: ProviderResponse) => {
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
                <ActivityIndicator size="large" color="#6A4C93"/>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholderTextColor="#888"
                placeholder="Search by category"
                value={search}
                onChangeText={handleSearch}
            />

            <View style={styles.filterRow}>
                <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.filterText}>⭐ Rating</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.filterText}>💸 Price</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Featured Services</Text>

            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{paddingBottom: 20}}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => handleSelect(item)} style={styles.card}>
                        <Image source={{uri: item.image}} style={styles.avatar}
                               onError={(e) => console.log('Image load error:', e.nativeEvent)}/>
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
    container: {flex: 1, padding: 16, backgroundColor: '#fff'},
    loader: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    searchInput: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 12,
        color: '#000',
    },
    filterRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    filterButton: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    filterText: {
        fontSize: 14,
        color: '#333',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: {width: 0, height: 2},
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
