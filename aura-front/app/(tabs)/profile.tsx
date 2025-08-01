import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

export default function ProfileScreen() {
    const user = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatar: 'https://via.placeholder.com/100',
        role: 'provider', // or 'user'
    };

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
                    // Clear auth state or redirect to login screen
                    console.log('Logged out');
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Text style={styles.role}>{user.role === 'provider' ? 'Service Provider' : 'User'}</Text>

            <TouchableOpacity style={styles.button} onPress={handleEdit}>
                <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { backgroundColor: '#e26a6a' }]} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', paddingTop: 50 },
    avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 14 },
    name: { fontSize: 20, fontWeight: '600', color: '#333' },
    email: { fontSize: 14, color: '#777', marginBottom: 4 },
    role: { fontSize: 14, color: '#6A4C93', marginBottom: 30 },
    button: {
        backgroundColor: '#6A4C93',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 12,
    },
    buttonText: { color: '#fff', fontSize: 16 },
});
