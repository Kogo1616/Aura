// components/CustomHeader.tsx
import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

type Props = {
    value: string;
    onChangeText: (t: string) => void;
};

export default function CustomHeader({ value, onChangeText }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={18} color="#6A4C93" style={styles.searchIcon} />
                <TextInput
                    placeholder="Search by category"
                    placeholderTextColor="#999"
                    style={styles.searchInput}
                    value={value}
                    onChangeText={onChangeText}
                />
            </View>
            <View style={styles.filterRow}>
                <TouchableOpacity style={styles.filterBtn}>
                    <MaterialIcons name="star-border" size={16} color="#6A4C93" />
                    <Text style={styles.filterText}> Rating</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterBtn}>
                    <MaterialIcons name="sort" size={16} color="#6A4C93" />
                    <Text style={styles.filterText}> Price</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: 60,
        paddingBottom: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    searchContainer: {
        backgroundColor: '#f2f2f7',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    searchIcon: { marginRight: 8 },
    searchInput: {
        fontSize: 16,
        flex: 1,
        color: '#333',
    },
    filterRow: {
        flexDirection: 'row',
        marginTop: 12,
    },
    filterBtn: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f7',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
    },
    filterText: {
        fontSize: 14,
        color: '#6A4C93',
        fontWeight: '500',
    },
});
