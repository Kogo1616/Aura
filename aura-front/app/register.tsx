import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { useAuthStore } from '../stores/useAuthStore';
import { router } from 'expo-router';

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const login = useAuthStore((s) => s.login);

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert('Please fill all fields');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Passwords do not match');
            return;
        }

        try {
            setLoading(true);

            // 🔐 1. Register the user
            const registerRes = await fetch('http://192.168.100.3:5020/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!registerRes.ok) {
                const error = await registerRes.text();
                throw new Error(error || 'Registration failed');
            }

            // 🔐 2. Then log in immediately
            const loginRes = await fetch('http://192.168.100.3:5020/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    password,
                    twoFactorCode: '',
                    twoFactorRecoveryCode: '',
                }),
            });

            if (!loginRes.ok) {
                const error = await loginRes.text();
                throw new Error(error || 'Login after register failed');
            }

            const result = await loginRes.json();

            // ✅ 3. Save user in auth store
            login({
                email,
                name: 'New User',
                role: 'user', // You can update this from API if returned
            });

            // ✅ 4. Redirect to home
            router.replace('/');
        } catch (err: any) {
            Alert.alert('Error', err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.6 }]}
                onPress={handleRegister}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Registering...' : 'Register'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={styles.link}>Already have an account? Log In</Text>
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
