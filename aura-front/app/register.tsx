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
import { loginUser, registerUser } from '../api/auth';

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState<'user' | 'provider'>('user');
    const [loading, setLoading] = useState(false);
    const login = useAuthStore((s) => s.login);

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            return Alert.alert('Validation', 'Please fill all fields');
        }

        if (password !== confirmPassword) {
            return Alert.alert('Validation', 'Passwords do not match');
        }

        try {
            setLoading(true);

            await registerUser(email, password, role);
            const loggedUser = await loginUser(email, password);
            login(loggedUser);

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
                placeholderTextColor="#999"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <View style={styles.roleContainer}>
                {['user', 'provider'].map((type) => (
                    <TouchableOpacity
                        key={type}
                        style={[
                            styles.roleButton,
                            role === type && styles.roleSelected,
                        ]}
                        onPress={() => setRole(type as 'user' | 'provider')}
                    >
                        <Text
                            style={
                                role === type
                                    ? styles.roleTextSelected
                                    : styles.roleText
                            }
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

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
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 20,
        color: '#6A4C93',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 10,
        marginBottom: 14,
        color: '#000',
    },
    roleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    roleButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        marginHorizontal: 6,
    },
    roleSelected: {
        backgroundColor: '#6A4C93',
        borderColor: '#6A4C93',
    },
    roleText: {
        color: '#333',
    },
    roleTextSelected: {
        color: '#fff',
        fontWeight: '600',
    },
    button: {
        backgroundColor: '#6A4C93',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
    link: {
        textAlign: 'center',
        color: '#6A4C93',
        marginTop: 12,
    },
});
