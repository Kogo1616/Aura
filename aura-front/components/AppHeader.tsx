import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useAuthStore } from '../stores/useAuthStore';
import { Ionicons } from '@expo/vector-icons';

export default function AppHeader() {
    const { logout } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();

    const screenTitle = (() => {
        if (pathname === '/profile') return 'Profile';
        if (pathname === '/bookings') return 'Bookings';
        if (pathname === '/notifications') return 'Notifications';
        return 'Home';
    })();

    const handleLogout = () => {
        logout();
        router.replace('/login');
    };

    return (
        <View style={styles.header}>
            <Text style={styles.title}>Aura</Text>
            <Text style={styles.screen}>{screenTitle}</Text>
            <TouchableOpacity onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={22} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#6A4C93',
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    screen: {
        fontSize: 16,
        color: '#fff',
    },
});
