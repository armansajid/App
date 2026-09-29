import 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DataProvider } from './lib/DataContext';
import { useAppTheme } from './lib/theme';
import ExpensesScreen from './screens/ExpensesScreen';
import FeesScreen from './screens/FeesScreen';
import SettingsScreen from './screens/SettingsScreen';
import StudentsScreen from './screens/StudentsScreen';
import SummaryScreen from './screens/SummaryScreen';

const Tab = createBottomTabNavigator();
const tabIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  Fees: 'cash-outline', Students: 'people-outline', Expenses: 'receipt-outline', Summary: 'bar-chart-outline', Settings: 'settings-outline',
};

function AppNavigator() {
  const t = useAppTheme();
  const navigationTheme = t.dark
    ? { ...DarkTheme, colors: { ...DarkTheme.colors, primary: t.primary, background: t.bg, card: t.surface, text: t.text, border: t.border } }
    : { ...DefaultTheme, colors: { ...DefaultTheme.colors, primary: t.primary, background: t.bg, card: t.surface, text: t.text, border: t.border } };
  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style={t.dark ? 'light' : 'dark'} />
      <Tab.Navigator
        initialRouteName="Fees"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: t.primary,
          tabBarInactiveTintColor: t.muted,
          tabBarStyle: { backgroundColor: t.surface, borderTopColor: t.border, height: 64, paddingTop: 6, paddingBottom: 7 },
          tabBarLabelStyle: { fontSize: 10, fontWeight: '700' },
          tabBarIcon: ({ color, size }) => <Ionicons name={tabIcons[route.name]} size={size} color={color} />,
        })}
      >
        <Tab.Screen name="Fees" component={FeesScreen} />
        <Tab.Screen name="Students" component={StudentsScreen} />
        <Tab.Screen name="Expenses" component={ExpensesScreen} />
        <Tab.Screen name="Summary" component={SummaryScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({ ...Ionicons.font });
  if (!fontsLoaded) return <View style={styles.loading}><ActivityIndicator color="#176B5B" /></View>;
  return (
    <SafeAreaProvider>
      <DataProvider>
        <AppNavigator />
      </DataProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({ loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F7F8' } });
