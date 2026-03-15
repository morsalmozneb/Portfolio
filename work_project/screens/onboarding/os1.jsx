// screens/onboarding/os1.jsx
// OnboardScreen_1 — Requirement 5: Onboarding Flow (Screen 1 of 3)
//
// This is the first of three onboarding screens the user sees on first launch.
// It introduces the OLIVE YOUNG brand and prompts the user to continue.
// Navigation: tapping "Next" moves to OnBoardScreen2 (os2.jsx).
//
// NOTE: Onboarding is skipped on return visits — see App.js for the
// AsyncStorage check that controls whether onboarding is shown.

import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Text } from '@rneui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';
import { themePalette } from '../../themes/oliveYoungTheme';

// ─── OnboardScreen_1 ─────────────────────────────────────────────────────────
// Displays a welcome/brand introduction with a "Next" button.
// Receives the navigation prop from the OnboardingStack in App.js.
export default function OnboardScreen_1({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* ── Screen label (Req 5: visually labelled) ── */}
        <Text style={styles.screenLabel}>OnboardScreen_1</Text>

        {/* ── Brand icon ── */}
        <View style={styles.iconCircle}>
          <Ionicons name="leaf-outline" size={72} color={themePalette.primary} />
        </View>

        {/* ── Welcome heading ── */}
        <Text style={styles.heading}>Welcome to{'\n'}OLIVE YOUNG</Text>

        {/* ── Short brand description ── */}
        <Text style={styles.body}>
          Your destination for authentic Korean beauty, skincare, and wellness
          products — curated and delivered to your door.
        </Text>

        {/* ── Progress dots (3 dots, dot 1 active) ── */}
        <View style={styles.dotsRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* ── Next button — navigates to Screen 2 ── */}
        <TouchableOpacity
          style={styles.nextButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Onboard2')}
        >
          <Text style={styles.nextButtonText}>Next</Text>
          <Ionicons
            name="arrow-forward-outline"
            size={20}
            color={themePalette.white}
            style={{ marginLeft: 8 }}
          />
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

  // Small label in the top-left corner to identify the screen (Req 5)
  screenLabel: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 11,
    color: themePalette.textSecondary,
    fontFamily: 'Inter_400Regular',
  },

  // Green circle holding the leaf icon
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: themePalette.sidebar,
    borderWidth: 2,
    borderColor: themePalette.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 36,
  },

  // Main heading
  heading: {
    fontSize: 30,
    fontFamily: 'Inter_700Bold',
    color: themePalette.textPrimary,
    textAlign: 'center',
    lineHeight: 38,
    marginBottom: 16,
  },

  // Supporting body text
  body: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: themePalette.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },

  // Progress indicator row
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 40,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: themePalette.secondary,
  },
  dotActive: {
    backgroundColor: themePalette.primary,
    width: 28, // elongated to show current position
  },

  // Primary CTA button
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themePalette.primary,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 30,
  },
  nextButtonText: {
    color: themePalette.white,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});
