import { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuthStore } from '../stores/useAuthStore';
import { router } from 'expo-router';
import { registerUser } from '../api/auth';
import { fetchSkills } from '../api/provider';
import Checkbox from 'expo-checkbox';

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState<'user' | 'provider'>('user');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bio, setBio] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [availableSkills, setAvailableSkills] = useState<{ id: number, name: string }[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [skillsLoading, setSkillsLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const login = useAuthStore((s) => s.login);

    useEffect(() => {
        if (role === 'provider') {
            loadSkills();
        }
    }, [role]);

    const loadSkills = async () => {
        try {
            setSkillsLoading(true);
            const skills = await fetchSkills();
            setAvailableSkills(skills);
        } catch {
            Alert.alert('Error', 'Failed to load skills');
        } finally {
            setSkillsLoading(false);
        }
    };

    const handleRegister = async () => {
        const newErrors: { [key: string]: string } = {};

        if (!firstName) newErrors.firstName = 'First name is required';
        if (!lastName) newErrors.lastName = 'Last name is required';
        if (!phoneNumber) newErrors.phoneNumber = 'Phone number is required';
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        if (!confirmPassword) newErrors.confirmPassword = 'Confirm your password';
        if (password && confirmPassword && password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!role) newErrors.role = 'Please select a role';

        if (role === 'provider') {
            if (!bio) newErrors.bio = 'Bio is required';
            if (!avatarUrl) newErrors.avatarUrl = 'Avatar is required';
            if (selectedSkills.length === 0) newErrors.skills = 'Select at least one skill';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            Alert.alert('Error', 'Please fix the highlighted fields.');
            return;
        }

        try {
            setLoading(true);

            await registerUser({
                firstName,
                lastName,
                email,
                phoneNumber,
                userName: email,
                password,
                role,
                avatarUrl: role === 'provider' ? avatarUrl : '',
                bio: role === 'provider' ? bio : '',
                skills: role === 'provider' ? selectedSkills : undefined,
            });

            login({
                email,
                name: `${firstName} ${lastName}`,
                role,
            });

            router.replace('/');
        } catch (err: any) {
            Alert.alert('Error', err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permission to access media is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled && result.assets.length > 0) {
            setAvatarUrl(result.assets[0].uri);
        }
    };

    const toggleSkill = (skillId: number) => {
        setSelectedSkills(prev =>
            prev.includes(skillId)
                ? prev.filter(id => id !== skillId)
                : [...prev, skillId]
        );
    };

    const getInputStyle = (field: string) => [styles.input, errors[field] && { borderColor: 'red' }];

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                <View style={styles.inner}>
                    <Text style={styles.title}>Register</Text>

                    <TextInput
                        style={getInputStyle('firstName')}
                        placeholderTextColor="#999"
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={text => {
                            setFirstName(text);
                            if (errors.firstName) setErrors(prev => ({ ...prev, firstName: '' }));
                        }}
                    />
                    {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

                    <TextInput
                        style={getInputStyle('lastName')}
                        placeholder="Last Name"
                        placeholderTextColor="#999"
                        value={lastName}
                        onChangeText={text => {
                            setLastName(text);
                            if (errors.lastName) setErrors(prev => ({ ...prev, lastName: '' }));
                        }}
                    />
                    {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

                    <TextInput
                        style={getInputStyle('phoneNumber')}
                        placeholder="Phone Number"
                        placeholderTextColor="#999"
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={text => {
                            setPhoneNumber(text);
                            if (errors.phoneNumber) setErrors(prev => ({ ...prev, phoneNumber: '' }));
                        }}
                    />
                    {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

                    <TextInput
                        style={getInputStyle('email')}
                        placeholder="Email"
                        placeholderTextColor="#999"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={text => {
                            setEmail(text);
                            if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                        }}
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                    <TextInput
                        style={getInputStyle('password')}
                        placeholder="Password"
                        placeholderTextColor="#999"
                        secureTextEntry
                        value={password}
                        onChangeText={text => {
                            setPassword(text);
                            if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                        }}
                    />
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                    <TextInput
                        style={getInputStyle('confirmPassword')}
                        placeholder="Confirm Password"
                        placeholderTextColor="#999"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={text => {
                            setConfirmPassword(text);
                            if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
                        }}
                    />
                    {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                    <View style={styles.roleContainer}>
                        <TouchableOpacity
                            style={[styles.roleButton, role === 'user' && styles.roleSelected]}
                            onPress={() => setRole('user')}
                        >
                            <Text style={role === 'user' ? styles.roleTextSelected : styles.roleText}>User</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.roleButton, role === 'provider' && styles.roleSelected]}
                            onPress={() => setRole('provider')}
                        >
                            <Text style={role === 'provider' ? styles.roleTextSelected : styles.roleText}>Provider</Text>
                        </TouchableOpacity>
                    </View>

                    {role === 'provider' && (
                        <>
                            <TouchableOpacity style={styles.avatarButton} onPress={pickImage}>
                                <Text style={styles.avatarText}>Upload Avatar</Text>
                            </TouchableOpacity>
                            {avatarUrl ? <Image source={{ uri: avatarUrl }} style={styles.avatarPreview} /> : null}
                            {errors.avatarUrl && <Text style={styles.errorText}>{errors.avatarUrl}</Text>}

                            <TextInput
                                style={[styles.input, errors.bio && { borderColor: 'red' }]}
                                placeholder="Bio"
                                placeholderTextColor="#999"
                                value={bio}
                                onChangeText={text => {
                                    setBio(text);
                                    if (errors.bio) setErrors(prev => ({ ...prev, bio: '' }));
                                }}
                                multiline
                            />
                            {errors.bio && <Text style={styles.errorText}>{errors.bio}</Text>}

                            {skillsLoading ? (
                                <Text>Loading skills...</Text>
                            ) : (
                                <View style={styles.skillsContainer}>
                                    <Text style={styles.skillsTitle}>Select Skills:</Text>
                                    {availableSkills.map(skill => (
                                        <View key={skill.id} style={styles.skillItem}>
                                            <Checkbox
                                                value={selectedSkills.includes(skill.id)}
                                                onValueChange={() => toggleSkill(skill.id)}
                                                color={selectedSkills.includes(skill.id) ? '#6A4C93' : undefined}
                                            />
                                            <Text style={styles.skillText}>{skill.name}</Text>
                                        </View>
                                    ))}
                                    {errors.skills && <Text style={styles.errorText}>{errors.skills}</Text>}
                                </View>
                            )}
                        </>
                    )}

                    <TouchableOpacity
                        style={[styles.button, loading && { opacity: 0.6 }]}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>{loading ? 'Registering...' : 'Register'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/login')}>
                        <Text style={styles.link}>Already have an account? Log In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 40,
        backgroundColor: '#fff',
    },
    inner: {
        paddingTop: 80,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 24,
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
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 6,
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
    avatarButton: {
        backgroundColor: '#eee',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    avatarText: {
        color: '#333',
    },
    avatarPreview: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignSelf: 'center',
        marginBottom: 14,
    },
    skillsContainer: {
        marginBottom: 14,
    },
    skillsTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    skillItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    skillText: {
        marginLeft: 8,
        color: '#333',
    },
});
