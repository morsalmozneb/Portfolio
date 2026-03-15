// screens/HomeScreen.js
// Main landing screen - improved with category shortcuts, featured section, and promo banner

import React from 'react';
import { StyleSheet, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, Divider } from '@rneui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';
import { themePalette } from '../themes/oliveYoungTheme';

// Category shortcut data — icons link to drawer sections
const CATEGORIES = [
  { label: 'Skincare',   icon: 'water-outline',         route: 'Skincare'    },
  { label: 'Makeup',     icon: 'color-palette-outline',  route: 'Makeup'      },
  { label: 'Haircare',   icon: 'cut-outline',            route: 'Haircare'    },
  { label: 'Body Care',  icon: 'body-outline',           route: 'BodyCare'    },
  { label: 'Wellness',   icon: 'heart-outline',          route: 'Wellness'    },
];

// Trust / feature badges shown below the hero
const FEATURES = [
  { icon: 'shield-checkmark-outline', label: 'Authentic'      },
  { icon: 'rocket-outline',           label: 'Fast Shipping'  },
  { icon: 'star-outline',             label: 'Best Sellers'   },
  { icon: 'refresh-outline',          label: 'Easy Returns'   },
];

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* ── Hero Banner ──────────────────────────────────────── */}
      <ImageBackground
        source={require('../assets/images/banner-homepage.png')}
        style={styles.heroImage}
        resizeMode="cover"
      >
        {/* Semi-transparent gradient overlay for text readability */}
        <View style={styles.overlay}>
          <Text style={styles.welcomeText}>Welcome to{'\n'}OLIVE YOUNG</Text>
          <Text style={styles.subtitleText}>Discover Korean Beauty & Skincare</Text>

          <Button
            title="Shop Now"
            icon={() => (
              <Ionicons
                name="arrow-forward-outline"
                size={22}
                color={themePalette.white}
                style={{ marginLeft: 8 }}
              />
            )}
            iconPosition="right"
            raised={true}
            buttonStyle={styles.shopButton}
            containerStyle={styles.buttonContainer}
            onPress={() => navigation.navigate('Skincare')}
          />
        </View>
      </ImageBackground>

      {/* ── Trust Badges ─────────────────────────────────────── */}
      <View style={styles.featuresContainer}>
        {FEATURES.map((f) => (
          <View key={f.label} style={styles.featureItem}>
            <View style={styles.featureIconCircle}>
              <Ionicons name={f.icon} size={22} color={themePalette.primary} />
            </View>
            <Text style={styles.featureText}>{f.label}</Text>
          </View>
        ))}
      </View>

      {/* ── Category Shortcuts ───────────────────────────────── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shop by Category</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.label}
              style={styles.categoryItem}
              onPress={() => navigation.navigate(cat.route)}
              activeOpacity={0.75}
            >
              {/* Icon circle */}
              <View style={styles.categoryIconCircle}>
                <Ionicons name={cat.icon} size={26} color={themePalette.primary} />
              </View>
              <Text style={styles.categoryLabel}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Divider style={styles.divider} />

      {/* ── Promo Banner ─────────────────────────────────────── */}
      <View style={styles.section}>
        <View style={styles.promoBanner}>
          <View style={styles.promoTextBlock}>
            <Text style={styles.promoTag}>LIMITED OFFER</Text>
            <Text style={styles.promoHeading}>Free Shipping{'\n'}on orders $60+</Text>
            <Text style={styles.promoSub}>Use code: OLIVESHIP</Text>
          </View>
          <View style={styles.promoIconBlock}>
            <Ionicons name="gift-outline" size={64} color={themePalette.primary} />
          </View>
        </View>
      </View>

      <Divider style={styles.divider} />

      {/* ── Quick Links ──────────────────────────────────────── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explore</Text>
        <View style={styles.quickLinksGrid}>

          <TouchableOpacity
            style={[styles.quickLinkCard, styles.quickLinkGreen]}
            onPress={() => navigation.navigate('BestSellers')}
            activeOpacity={0.8}
          >
            <Ionicons name="trophy-outline" size={32} color={themePalette.white} />
            <Text style={styles.quickLinkText}>Best Sellers</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickLinkCard, styles.quickLinkLight]}
            onPress={() => navigation.navigate('NewArrivals')}
            activeOpacity={0.8}
          >
            <Ionicons name="sparkles-outline" size={32} color={themePalette.primary} />
            <Text style={[styles.quickLinkText, { color: themePalette.primary }]}>New Arrivals</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickLinkCard, styles.quickLinkLight]}
            onPress={() => navigation.navigate('Skincare')}
            activeOpacity={0.8}
          >
            <Ionicons name="leaf-outline" size={32} color={themePalette.primary} />
            <Text style={[styles.quickLinkText, { color: themePalette.primary }]}>Skincare</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickLinkCard, styles.quickLinkGreen]}
            onPress={() => navigation.navigate('Wellness')}
            activeOpacity={0.8}
          >
            <Ionicons name="heart-outline" size={32} color={themePalette.white} />
            <Text style={styles.quickLinkText}>Wellness</Text>
          </TouchableOpacity>

        </View>
      </View>

      {/* Bottom padding */}
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themePalette.background,
  },

  // ── Hero ──────────────────────────────────────────────────
  heroImage: {
    width: '100%',
    height: 320,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 24,
    paddingVertical: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    color: themePalette.white,
    fontSize: 30,
    fontFamily: 'Inter_700Bold',
    lineHeight: 38,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.88)',
    fontFamily: 'Inter_400Regular',
    marginBottom: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    borderRadius: 25,
  },
  shopButton: {
    paddingVertical: 13,
    paddingHorizontal: 32,
    borderRadius: 25,
  },

  // ── Trust Badges ──────────────────────────────────────────
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: themePalette.white,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: themePalette.secondary,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: themePalette.sidebar,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  featureText: {
    fontSize: 10,
    color: themePalette.textSecondary,
    textAlign: 'center',
    fontFamily: 'Inter_500Medium',
  },

  // ── Shared Section ────────────────────────────────────────
  section: {
    backgroundColor: themePalette.white,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: 'Inter_700Bold',
    color: themePalette.textPrimary,
    marginBottom: 14,
  },
  divider: {
    height: 8,
    backgroundColor: themePalette.secondary,
  },

  // ── Category Shortcuts ────────────────────────────────────
  categoriesRow: {
    paddingRight: 10,
    gap: 16,
  },
  categoryItem: {
    alignItems: 'center',
    width: 72,
  },
  categoryIconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: themePalette.sidebar,
    borderWidth: 1.5,
    borderColor: themePalette.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryLabel: {
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
    color: themePalette.textPrimary,
    textAlign: 'center',
  },

  // ── Promo Banner ──────────────────────────────────────────
  promoBanner: {
    backgroundColor: themePalette.sidebar,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: themePalette.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  promoTextBlock: {
    flex: 1,
  },
  promoTag: {
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
    color: themePalette.primary,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  promoHeading: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: themePalette.textPrimary,
    lineHeight: 26,
    marginBottom: 6,
  },
  promoSub: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: themePalette.textSecondary,
  },
  promoIconBlock: {
    marginLeft: 16,
    opacity: 0.85,
  },

  // ── Quick Links Grid ──────────────────────────────────────
  quickLinksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  quickLinkCard: {
    width: '47.5%',
    borderRadius: 14,
    paddingVertical: 22,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  quickLinkGreen: {
    backgroundColor: themePalette.primary,
  },
  quickLinkLight: {
    backgroundColor: themePalette.sidebar,
    borderWidth: 1.5,
    borderColor: themePalette.primary,
  },
  quickLinkText: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: themePalette.white,
    textAlign: 'center',
  },
});
