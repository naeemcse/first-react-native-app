import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack,Slot } from 'expo-router';
export default function RootLayout() {

  return (
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
      </Stack>
  );
}
