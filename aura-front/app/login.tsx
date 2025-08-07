import { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import { router } from 'expo-router';
import { loginUser } from '../api/auth';
import { useAuthStore } from '../stores/useAuthStore';

export default function LoginScreen() {
    const login = useAuthStore((s) => s.login);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Please fill all fields');
            return;
        }
        
        setLoading(true);
        try {
            const user = await loginUser(email, password);
            login(user);
            router.replace('/');
        } catch (err: any) {
            Alert.alert('Login Failed', err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log In</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Log In'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={styles.link}>Don’t have an account? Register</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: '#fff', justifyContent: 'center' },
    title: { fontSize: 24, fontWeight: '700', marginBottom: 20, color: '#6A4C93', textAlign: 'center' },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 10,
        marginBottom: 14,
    },
    button: {
        backgroundColor: '#6A4C93',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: { color: '#fff', fontWeight: '600' },
    link: { textAlign: 'center', color: '#6A4C93', marginTop: 12 },
});
