// screens/onboarding/os2.jsx
// OnBoardScreen2 — Requirement 5: Onboarding Flow (Screen 2 of 3)
//
// Second onboarding screen. Highlights key app features (skincare, makeup, etc.)
// so the user understands what OLIVE YOUNG offers before entering the main app.
// Navigation: "Back" returns to Screen 1, "Next" proceeds to Screen 3 (os3.jsx).

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

// Feature list shown on this screen — icon, title, and short description
// These match the drawer categories in the main app
const FEATURES = [
  {
    icon: 'water-outline',
    title: 'Skincare',
    desc: 'Serums, moisturisers, sunscreens & more',
  },
  {
    icon: 'color-palette-outline',
    title: 'Makeup',
    desc: 'Foundation, lip colour, eye looks & more',
  },
  {
    icon: 'heart-outline',
    title: 'Wellness',
    desc: 'Supplements, vitamins, and self-care',
  },
];

// ─── OnBoardScreen2 ──────────────────────────────────────────────────────────
// Feature showcase — shows what the app contains before the user logs in.
export default function OnBoardScreen2({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* ── Screen label (Req 5: visually labelled) ── */}
        <Text style={styles.screenLabel}>OnBoardScreen2</Text>

        {/* ── Section heading ── */}
        <Text style={styles.heading}>Everything{'\n'}You Need</Text>
        <Text style={styles.subheading}>
          Browse hundreds of authentic Korean beauty products across all categories.
        </Text>

        {/* ── Feature cards ── */}
        <View style={styles.featuresContainer}>
          {FEATURES.map((f) => (
            <View key={f.title} style={styles.featureRow}>
              {/* Icon badge */}
              <View style={styles.featureIconCircle}>
                <Ionicons name={f.icon} size={26} color={themePalette.primary} />
              </View>

              {/* Text block */}
              <View style={styles.featureTextBlock}>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* ── Progress dots (dot 2 active) ── */}
        <View style={styles.dotsRow}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
        </View>

        {/* ── Navigation buttons row ── */}
        <View style={styles.buttonsRow}>

          {/* Back button — returns to Screen 1 */}
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back-outline"
              size={20}
              color={themePalette.primary}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          {/* Next button — advances to Screen 3 */}
          <TouchableOpacity
            style={styles.nextButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Onboard3')}
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

  // Identifies screen for grading / debugging (Req 5)
  screenLabel: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 11,
    color: themePalette.textSecondary,
    fontFamily: 'Inter_400Regular',
  },

  // Main heading
  heading: {
    fontSize: 30,
    fontFamily: 'Inter_700Bold',
    color: themePalette.textPrimary,
    textAlign: 'center',
    lineHeight: 38,
    marginBottom: 10,
  },
  subheading: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: themePalette.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },

  // List of feature rows
  featuresContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 36,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themePalette.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: themePalette.secondary,
    padding: 14,
  },
  featureIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: themePalette.sidebar,
    borderWidth: 1.5,
    borderColor: themePalette.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  featureTextBlock: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: themePalette.textPrimary,
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: themePalette.textSecondary,
  },

  // Progress dots — dot 2 is active/elongated
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 32,
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

  // Back + Next side by side
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    justifyContent: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: themePalette.primary,
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  backButtonText: {
    color: themePalette.primary,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themePalette.primary,
    paddingVertical: 13,
    paddingHorizontal: 28,
    borderRadius: 30,
  },
  nextButtonText: {
    color: themePalette.white,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});
