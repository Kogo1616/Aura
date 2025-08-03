import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useAuthStore } from '../../stores/useAuthStore'; // adjust path if needed
import { router } from 'expo-router';

export default function ProfileScreen() {
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);

    const handleEdit = () => {
        Alert.alert('Edit Profile', 'This will open an editable form soon.');
    };

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to log out?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout',
                style: 'destructive',
                onPress: () => {
                    logout();
                    router.replace('/login');
                },
            },
        ]);
    };

    if (!user) {
        return (
            <View style={styles.centered}>
                <Text style={styles.message}>You are not logged in.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: user.avatar || 'https://via.placeholder.com/100',
                }}
                style={styles.avatar}
            />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Text style={styles.role}>
                {user.role === 'provider' ? 'Service Provider' : 'User'}
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleEdit}>
                <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 50,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 14,
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    email: {
        fontSize: 14,
        color: '#777',
        marginBottom: 4,
    },
    role: {
        fontSize: 14,
        color: '#6A4C93',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#6A4C93',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 12,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    message: {
        fontSize: 16,
        color: '#999',
    },
});
