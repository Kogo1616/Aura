import { Stack, Redirect, usePathname } from 'expo-router';
import { useAuthStore } from '../stores/useAuthStore';

export default function RootLayout() {
    const user = useAuthStore((s) => s.user);
    const pathname = usePathname();
    const isAuthRoute = pathname === '/login' || pathname === '/register';

    if (!user && !isAuthRoute) {
        return <Redirect href="/login" />;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}
