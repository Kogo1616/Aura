// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#6A4C93',
                tabBarInactiveTintColor: 'gray',
                headerShown: true, // show header on tab screens
                tabBarIcon: ({ color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'home';
                    if (route.name === 'bookings') iconName = 'calendar';
                    else if (route.name === 'notifications') iconName = 'notifications';
                    else if (route.name === 'profile') iconName = 'person';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tabs.Screen name="index" options={{ title: 'Home' }} />
            <Tabs.Screen name="bookings" options={{ title: 'Bookings' }} />
            <Tabs.Screen name="notifications" options={{ title: 'Notifications' }} />
            <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
        </Tabs>
    );
}
