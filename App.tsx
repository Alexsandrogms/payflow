import 'react-native-gesture-handler';
import 'react-native-get-random-values'
import React from 'react';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';

import { AuthProvider } from './src/hooks/useAuth';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_400Regular,
    'Lexend-400Regular': require('./src/assets/fonts/Lexend-Regular.ttf'),
    'Lexend-600SemiBold': require('./src/assets/fonts/Lexend-SemiBold.ttf'),
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <AuthProvider>
      <StatusBar style="light" translucent />
      <Routes />
    </AuthProvider>
  );
}
