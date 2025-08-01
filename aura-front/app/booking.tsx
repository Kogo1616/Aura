import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useBookingStore } from '../stores/useBookingStore';
import uuid from 'react-native-uuid';

type Params = {
    providerName?: string;
};

export default function BookingScreen() {
    const { providerName } = useLocalSearchParams<Params>();

    // ✅ Make sure this exists
    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);

    const addBooking = useBookingStore((state) => state.addBooking);

    const handleConfirm = () => {
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });

        addBooking({
            id: uuid.v4().toString(),
            providerName: providerName || 'Unknown',
            date: formattedDate,
            time: formattedTime,
        });

        Alert.alert('Booking Confirmed', `${providerName} on ${formattedDate} at ${formattedTime}`, [
            { text: 'OK', onPress: () => router.replace('/(tabs)/bookings') },
        ]);
    };

    const onDateChange = (_: any, selectedDate?: Date) => {
        setShowDate(Platform.OS === 'ios');
        if (selectedDate) {
            const newDate = new Date(date);
            newDate.setFullYear(selectedDate.getFullYear());
            newDate.setMonth(selectedDate.getMonth());
            newDate.setDate(selectedDate.getDate());
            setDate(newDate);
        }
    };

    const onTimeChange = (_: any, selectedTime?: Date) => {
        setShowTime(Platform.OS === 'ios');
        if (selectedTime) {
            const newDate = new Date(date);
            newDate.setHours(selectedTime.getHours());
            newDate.setMinutes(selectedTime.getMinutes());
            setDate(newDate);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Book Appointment</Text>

            <Text style={styles.label}>Provider:</Text>
            <Text style={styles.value}>{providerName}</Text>

            <Text style={styles.label}>Select Date:</Text>
            <TouchableOpacity style={styles.button} onPress={() => setShowDate(true)}>
                <Text style={styles.buttonText}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Select Time:</Text>
            <TouchableOpacity style={styles.button} onPress={() => setShowTime(true)}>
                <Text style={styles.buttonText}>
                    {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
            </TouchableOpacity>

            {showDate && (
                <DateTimePicker mode="date" value={date} onChange={onDateChange} />
            )}
            {showTime && (
                <DateTimePicker mode="time" value={date} onChange={onTimeChange} />
            )}

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmText}>Confirm Booking</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20 },
    title: { fontSize: 22, fontWeight: '600', marginBottom: 20, color: '#333' },
    label: { fontSize: 16, color: '#666', marginTop: 12 },
    value: { fontSize: 18, color: '#444', marginBottom: 10 },
    button: {
        backgroundColor: '#e6e0f8',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8,
        marginTop: 6,
    },
    buttonText: { fontSize: 16, color: '#6A4C93' },
    confirmButton: {
        marginTop: 40,
        backgroundColor: '#6A4C93',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    confirmText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
