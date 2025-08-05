import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

export default function AIDesigner() {
    const [image, setImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState('Nails');

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const generateWithAI = async () => {
        setLoading(true);
        // 🔗 Call your AI backend here
        setTimeout(() => setLoading(false), 2000); // Placeholder
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>AI Style Designer</Text>

            <TouchableOpacity onPress={pickImage}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.imageText}>Upload Photo</Text>
                    </View>
                )}
            </TouchableOpacity>

            <TextInput
                style={styles.prompt}
                placeholder="Optional prompt (e.g. green hearts on nails)"
                value={prompt}
                onChangeText={setPrompt}
            />

            <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Nails" value="Nails" />
                {/* Add more categories as needed */}
            </Picker>

            <TouchableOpacity style={styles.button} onPress={generateWithAI} disabled={loading}>
                <Text style={styles.buttonText}>Generate with AI</Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator size="large" color="#6A4C93" style={{ marginTop: 20 }} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        color: '#6A4C93',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 12,
        marginBottom: 16,
    },
    imagePlaceholder: {
        width: '100%',
        height: 300,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    imageText: {
        color: '#666',
        fontSize: 16,
    },
    prompt: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    picker: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#6A4C93',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});
