import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import AppHeader from '../../components/AppHeader';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
    return (
        <View style={styles.container}>
            <AppHeader />

            <Tabs
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarActiveTintColor: '#6A4C93',
                    tabBarInactiveTintColor: '#999',
                    tabBarIcon: ({ color, size }) => {
                        let icon = 'home';
                        if (route.name === 'bookings') icon = 'calendar';
                        else if (route.name === 'notifications') icon = 'notifications';
                        else if (route.name === 'profile') icon = 'person';

                        return <Ionicons name={icon as any} size={size} color={color} />;
                    },
                })}
            >
                <Tabs.Screen name="index" options={{ title: 'Home' }} />
                <Tabs.Screen name="bookings" />
                <Tabs.Screen name="notifications" />
                <Tabs.Screen name="profile" />
            </Tabs>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
});
