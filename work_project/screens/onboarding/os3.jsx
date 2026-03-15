// screens/onboarding/os3.jsx
// OnBoardScreen3 — Requirement 5: Onboarding Flow (Screen 3 of 3)
//
// Final onboarding screen. The user taps "Get Started" to enter the main app.
// IMPORTANT: On "Get Started", this screen writes a flag to AsyncStorage so
// the onboarding flow is never shown again on subsequent app launches.
//
// AsyncStorage usage satisfies Requirement 4:
//   - Uses async / await and try / catch (promise-based)
//   - setItem(key, value) persists the completion flag
//   - The key 'onboarding_complete' must match ONBOARDING_KEY in App.js

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Text } from '@rneui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themePalette } from '../../themes/oliveYoungTheme';

// AsyncStorage key — must match ONBOARDING_KEY in App.js
// When this key exists, App.js skips onboarding and shows the main app
const ONBOARDING_KEY = 'onboarding_complete';

// ─── OnBoardScreen3 ──────────────────────────────────────────────────────────
// "Get Started" screen — saves onboarding completion and navigates to the app.
export default function OnBoardScreen3({ navigation }) {
  // Track loading state while the AsyncStorage write is in progress
  const [saving, setSaving] = useState(false);

  // Called when the user taps "Get Started"
  // Persists the onboarding_complete flag using async / await + try / catch (Req 4)
  const handleGetStarted = async () => {
    setSaving(true); // show spinner while writing

    try {
      // setItem(key, value) — Requirement 4
      // Stores 'true' as a string; App.js checks if this key exists (not null)
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');

      // Navigate to the main Home screen and remove the onboarding stack
      // so the user cannot navigate back into onboarding
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      // Log the error so a developer can debug it; the app will still proceed
      console.error('OnBoardScreen3 AsyncStorage setItem error:', error);
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* ── Screen label (Req 5: visually labelled) ── */}
        <Text style={styles.screenLabel}>OnBoardScreen3</Text>

        {/* ── Checkmark icon — signals readiness to begin ── */}
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark-circle-outline" size={80} color={themePalette.primary} />
        </View>

        {/* ── Final CTA heading ── */}
        <Text style={styles.heading}>You're All Set!</Text>

        {/* ── Closing message ── */}
        <Text style={styles.body}>
          Start exploring K-beauty essentials — skincare routines, bestselling
          products, and exclusive deals await you.
        </Text>

        {/* ── Progress dots (dot 3 active) ── */}
        <View style={styles.dotsRow}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
        </View>

        {/* ── Get Started button ── */}
        {/* Disabled and shows a spinner while AsyncStorage is writing */}
        <TouchableOpacity
          style={[styles.startButton, saving && styles.startButtonDisabled]}
          activeOpacity={0.8}
          onPress={handleGetStarted}
          disabled={saving}
        >
          {saving ? (
            // Show a small spinner while persisting to AsyncStorage
            <ActivityIndicator size="small" color={themePalette.white} />
          ) : (
            <>
              <Text style={styles.startButtonText}>Get Started</Text>
              <Ionicons
                name="rocket-outline"
                size={20}
                color={themePalette.white}
                style={{ marginLeft: 8 }}
              />
            </>
          )}
        </TouchableOpacity>

        {/* ── Back button ── */}
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.75}
          onPress={() => navigation.goBack()}
          disabled={saving}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: themePalette.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },

  // Screen identifier label (Req 5)
  screenLabel: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 11,
    color: themePalette.textSecondary,
    fontFamily: 'Inter_400Regular',
  },

  // Large checkmark icon circle
  iconCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: themePalette.sidebar,
    borderWidth: 2,
    borderColor: themePalette.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 36,
  },

  // "You're All Set!" heading
  heading: {
    fontSize: 30,
    fontFamily: 'Inter_700Bold',
    color: themePalette.textPrimary,
    textAlign: 'center',
    marginBottom: 14,
  },

  // Supporting body text
  body: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: themePalette.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 36,
  },

  // Progress dots — third dot is active
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 36,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: themePalette.secondary,
  },
  dotActive: {
    backgroundColor: themePalette.primary,
    width: 28,
  },

  // "Get Started" primary button
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themePalette.primary,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 30,
    width: '100%',
    marginBottom: 14,
    minHeight: 54,
  },
  startButtonDisabled: {
    // Slightly muted while AsyncStorage write is in progress
    opacity: 0.7,
  },
  startButtonText: {
    color: themePalette.white,
    fontSize: 17,
    fontFamily: 'Inter_600SemiBold',
  },

  // Subtle text-only back button
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  backButtonText: {
    color: themePalette.textSecondary,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    textDecorationLine: 'underline',
  },
});
