import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert,
} from 'react-native';
import { useAuthStore } from '../../stores/useAuthStore';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal'; // Animated modal

export default function ProfileScreen() {
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);

    const [avatar, setAvatar] = useState(user?.avatar || '');
    const [phone, setPhone] = useState('591171518');
    const [bio, setBio] = useState('Haiiiiii');
    const [skills, setSkills] = useState<string[]>(['Nail', 'Haircut', 'Makeup']);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

    // modal state
    const [showSkillModal, setShowSkillModal] = useState(false);
    const [newSkill, setNewSkill] = useState('');

    const handleEditAvatar = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert('Permission Denied', 'Camera roll access is required.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets?.length > 0) {
            const selectedUri = result.assets[0].uri;
            setAvatar(selectedUri);
            Alert.alert('Avatar Selected', 'Avatar has been updated.');
        }
    };

    const handleSave = () => {
        Alert.alert('Profile Saved', 'Your changes have been saved.');
    };

    const handleAddSkill = () => {
        setShowSkillModal(true);
    };

    const confirmAddSkill = () => {
        if (newSkill.trim()) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill('');
            setShowSkillModal(false);
        }
    };

    const cancelAddSkill = () => {
        setNewSkill('');
        setShowSkillModal(false);
    };

    const handleRemoveSkill = (skill: string) => {
        setSkills(skills.filter((s) => s !== skill));
        setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    };

    const toggleSkillSelection = (skill: string) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter((s) => s !== skill));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    if (!user) {
        return (
            <View style={styles.centered}>
                <Text style={styles.message}>You are not logged in.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={handleEditAvatar}>
                <Image
                    source={{ uri: avatar || 'https://via.placeholder.com/100' }}
                    style={styles.avatar}
                />
                <Text style={styles.tapToChange}>Tap to change</Text>
            </TouchableOpacity>

            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Text style={styles.role}>
                {user.role === 'provider' ? 'Service Provider' : user.role}
            </Text>

            <View style={styles.card}>
                <Label text="Phone Number" />
                <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />

                <Label text="Bio" />
                <TextInput
                    style={[styles.input, styles.textarea]}
                    multiline
                    numberOfLines={3}
                    value={bio}
                    onChangeText={setBio}
                />

                <Label text="Skills" />
                <View style={styles.skillsContainer}>
                    {skills.map((skill) => (
                        <TouchableOpacity
                            key={skill}
                            style={[
                                styles.skillTag,
                                selectedSkills.includes(skill) && styles.skillTagSelected,
                            ]}
                            onPress={() => toggleSkillSelection(skill)}
                            onLongPress={() => handleRemoveSkill(skill)}
                        >
                            <Text
                                style={
                                    selectedSkills.includes(skill)
                                        ? styles.skillTextSelected
                                        : {}
                                }
                            >
                                {skill}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        style={styles.addSkillButton}
                        onPress={handleAddSkill}
                    >
                        <Text style={styles.addSkillText}>+ Add Skill</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutText}>Sign Out</Text>
            </TouchableOpacity>

            {/* Skill Modal */}
            <Modal
                isVisible={showSkillModal}
                onBackdropPress={cancelAddSkill}
                onBackButtonPress={cancelAddSkill}
                animationIn="zoomIn"
                animationOut="fadeOut"
                useNativeDriver
                backdropColor="transparent"
                backdropOpacity={0}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Add New Skill</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Enter skill"
                            value={newSkill}
                            onChangeText={setNewSkill}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.modalButtonCancel}
                                onPress={cancelAddSkill}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButtonAdd}
                                onPress={confirmAddSkill}
                            >
                                <Text style={styles.modalButtonText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

function Label({ text }: { text: string }) {
    return <Text style={styles.detailLabel}>{text}</Text>;
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingBottom: 60,
        alignItems: 'center',
        backgroundColor: '#F9F9FB',
        flexGrow: 1,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 8,
        borderWidth: 2,
        borderColor: '#6A4C93',
    },
    tapToChange: {
        fontSize: 12,
        color: '#888',
        textAlign: 'center',
        marginBottom: 16,
    },
    name: {
        fontSize: 22,
        fontWeight: '600',
        color: '#2C2C2C',
    },
    email: {
        fontSize: 14,
        color: '#6e6e6e',
        marginTop: 4,
    },
    role: {
        fontSize: 14,
        color: '#6A4C93',
        marginTop: 2,
        marginBottom: 20,
    },
    card: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
        marginBottom: 20,
    },
    detailLabel: {
        fontSize: 14,
        color: '#888',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 12,
        fontSize: 14,
        width: '100%',
    },
    textarea: {
        height: 80,
        textAlignVertical: 'top',
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 12,
    },
    skillTag: {
        backgroundColor: '#eee',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        marginRight: 8,
        marginTop: 6,
    },
    skillTagSelected: {
        backgroundColor: '#6A4C93',
    },
    skillTextSelected: {
        color: '#fff',
        fontWeight: '600',
    },
    addSkillButton: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 8,
        marginTop: 6,
    },
    addSkillText: {
        color: '#555',
    },
    saveButton: {
        backgroundColor: '#4a63d0',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    logoutButton: {
        marginBottom: 40,
    },
    logoutText: {
        color: '#e14',
        fontSize: 14,
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
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
        textAlign: 'center',
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 14,
        marginBottom: 16,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButtonCancel: {
        backgroundColor: '#bbb',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    modalButtonAdd: {
        backgroundColor: '#6A4C93',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
});
