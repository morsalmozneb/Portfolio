// App.js — VERSION A: Text-only "OLIVE YOUNG" logo in every header (no leaf icon)
// Tapping the logo navigates to Home from any screen
// Fixes: no leaf icon, no duplicate logo on skincare page, clean product detail header

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, Text } from '@rneui/themed';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';

// Import screens
import HomeScreen from './screens/HomeScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';

// Import onboarding screens (Req 5)
import OnboardScreen_1 from './screens/onboarding/os1';
import OnBoardScreen2 from './screens/onboarding/os2';
import OnBoardScreen3 from './screens/onboarding/os3';

// Import theme configuration
import { oliveYoungTheme, themePalette } from './themes/oliveYoungTheme';

// Import FavouritesProvider so all screens share the same star state
import { FavouritesProvider } from './context/FavouritesContext';

// AsyncStorage key — must match the key used in os3.jsx
const ONBOARDING_KEY = 'onboarding_complete';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// ─── Placeholder screen ───────────────────────────────────────────────────────
function ComingSoonScreen() {
  return (
    <View style={styles.comingSoonContainer}>
      <Text style={styles.comingSoonText}>Coming Soon!</Text>
      <Text style={styles.comingSoonSubtext}>This feature is under development</Text>
    </View>
  );
}

// ─── Onboarding Stack (Req 5) ─────────────────────────────────────────────────
function OnboardingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboard1" component={OnboardScreen_1} />
      <Stack.Screen name="Onboard2" component={OnBoardScreen2} />
      <Stack.Screen name="Onboard3" component={OnBoardScreen3} />
    </Stack.Navigator>
  );
}

// ─── Text-only Logo Header (no icon) ─────────────────────────────────────────
// Just "OLIVE YOUNG" text — tapping navigates to Home
function LogoHeader({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('HomeDrawer')}
      activeOpacity={0.75}
    >
      <Text style={styles.logoHeaderText}>OLIVE YOUNG</Text>
    </TouchableOpacity>
  );
}

// ─── Product Stack ────────────────────────────────────────────────────────────
function ProductStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: themePalette.primary },
        headerTintColor: themePalette.white,
        // Logo in centre of header — tapping goes home
        headerTitle: () => <LogoHeader navigation={navigation} />,
        // Hamburger on the left opens the drawer
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 4, marginRight: 12, padding: 4 }}
          >
            <Ionicons name="menu-outline" size={28} color={themePalette.white} />
          </TouchableOpacity>
        ),
      }}
    >
      {/* Product list — uses default header (hamburger + logo) */}
      <Stack.Screen name="ProductList" component={ProductListScreen} />

      {/* Product detail — overrides headerLeft to show back arrow */}
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ navigation: stackNav }) => ({
          headerBackVisible: false, // hide the default back button
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => stackNav.goBack()}
              style={{ marginLeft: 4, marginRight: 12, padding: 4 }}
            >
              <Ionicons name="arrow-back-outline" size={28} color={themePalette.white} />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

// ─── Root Stack ───────────────────────────────────────────────────────────────
function RootNavigator({ showOnboarding }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {showOnboarding ? (
        <Stack.Screen name="Onboarding" component={OnboardingStack} />
      ) : null}
      <Stack.Screen name="Home" component={DrawerNavigator} />
    </Stack.Navigator>
  );
}

// ─── Drawer Navigator ─────────────────────────────────────────────────────────
function DrawerNavigator({ navigation }) {
  return (
    <Drawer.Navigator
      initialRouteName="HomeDrawer"
      screenOptions={{
        drawerStyle: { backgroundColor: themePalette.sidebar, width: 280 },
        drawerActiveTintColor: themePalette.primary,
        drawerInactiveTintColor: themePalette.textSecondary,
        drawerLabelStyle: { fontFamily: 'Inter_600SemiBold', fontSize: 16 },
        headerStyle: { backgroundColor: themePalette.primary },
        headerTintColor: themePalette.white,
        // Logo shown on all drawer screens
        headerTitle: () => <LogoHeader navigation={navigation} />,
      }}
    >
      <Drawer.Screen
        name="HomeDrawer"
        component={HomeScreen}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Skincare"
        component={ProductStack}
        options={{
          headerShown: false, // ProductStack has its own header
          drawerIcon: ({ color }) => <Ionicons name="water-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Makeup"
        component={ComingSoonScreen}
        options={{ title: 'Makeup', drawerIcon: ({ color }) => <Ionicons name="color-palette-outline" size={22} color={color} /> }}
      />
      <Drawer.Screen
        name="Haircare"
        component={ComingSoonScreen}
        options={{ title: 'Haircare', drawerIcon: ({ color }) => <Ionicons name="cut-outline" size={22} color={color} /> }}
      />
      <Drawer.Screen
        name="BodyCare"
        component={ComingSoonScreen}
        options={{ title: 'Body Care', drawerLabel: 'Body Care', drawerIcon: ({ color }) => <Ionicons name="body-outline" size={22} color={color} /> }}
      />
      <Drawer.Screen
        name="Wellness"
        component={ComingSoonScreen}
        options={{ title: 'Wellness', drawerIcon: ({ color }) => <Ionicons name="heart-outline" size={22} color={color} /> }}
      />
      <Drawer.Screen
        name="BestSellers"
        component={ComingSoonScreen}
        options={{ title: 'Best Sellers', drawerLabel: 'Best Sellers', drawerIcon: ({ color }) => <Ionicons name="star-outline" size={22} color={color} /> }}
      />
      <Drawer.Screen
        name="NewArrivals"
        component={ComingSoonScreen}
        options={{ title: 'New Arrivals', drawerLabel: 'New Arrivals', drawerIcon: ({ color }) => <Ionicons name="sparkles-outline" size={22} color={color} /> }}
      />
    </Drawer.Navigator>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(null);
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold });

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem(ONBOARDING_KEY);
        setShowOnboarding(value === null);
      } catch (error) {
        console.error('AsyncStorage getItem error:', error);
        setShowOnboarding(false);
      }
    };
    checkOnboarding();
  }, []);

  if (!fontsLoaded || showOnboarding === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={themePalette.primary} />
      </View>
    );
  }

  return (
    <FavouritesProvider>
      <ThemeProvider theme={oliveYoungTheme}>
        <NavigationContainer>
          <RootNavigator showOnboarding={showOnboarding} />
        </NavigationContainer>
      </ThemeProvider>
    </FavouritesProvider>
  );
}

const styles = StyleSheet.create({
  logoHeaderText: {
    color: themePalette.white,
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    letterSpacing: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themePalette.background,
  },
  comingSoonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themePalette.background,
    padding: 20,
  },
  comingSoonText: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: themePalette.primary,
    marginBottom: 10,
  },
  comingSoonSubtext: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: themePalette.textSecondary,
    textAlign: 'center',
  },
});
