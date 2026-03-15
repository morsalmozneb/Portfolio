// ProductDetailScreen.js
// Product detail screen with image carousel, collapsible sections, and star favourite toggle
// The star button demonstrates AsyncStorage data persistence (Req 4)

import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Image, Button, Divider } from '@rneui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';
import Carousel from 'react-native-reanimated-carousel';
import { themePalette } from '../themes/oliveYoungTheme';
import { getProductById } from '../data/product-data';
import CollapsibleSection from '../components/CollapsibleSection';

// Import useFavourites from shared context so star syncs with the list screen
import { useFavourites } from '../context/FavouritesContext';

export default function ProductDetailScreen({ route, navigation }) {
  // Get product ID passed from ProductListScreen
  const { productId } = route.params;

  // Fetch product data using the ID
  const product = getProductById(productId);

  // Get screen width for carousel sizing
  const { width: windowWidth } = Dimensions.get('window');

  // Collapsible section state
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [shippingExpanded, setShippingExpanded] = useState(false);

  // Favourites hook: loads from AsyncStorage on mount, saves on toggle (Req 4)
  const { isFavourite, toggleFavourite } = useFavourites();

  // Whether this specific product is currently starred
  const starred = isFavourite(productId);

  return (
    <ScrollView style={styles.container}>
      {/* ── Image Carousel ─────────────────────────────────────── */}
      <View style={styles.carouselContainer}>
        <Carousel
          width={windowWidth}
          height={400}
          data={product.carouselImages}
          renderItem={({ item: img }) => (
            <Image source={img} style={styles.carouselImage} resizeMode="cover" />
          )}
          loop={true}
          autoPlay={false}
          scrollAnimationDuration={300}
        />
      </View>

      {/* ── Product Information ─────────────────────────────────── */}
      <View style={styles.infoContainer}>
        {/* Brand name + Star / Favourite button row */}
        <View style={styles.brandRow}>
          <Text style={styles.brandText}>{product.brand}</Text>

          {/* Star button — toggles favourite and saves to AsyncStorage (Req 4) */}
          <TouchableOpacity
            onPress={() => toggleFavourite(productId)}
            activeOpacity={0.7}
            style={styles.starButton}
            accessibilityLabel={starred ? 'Remove from favourites' : 'Add to favourites'}
          >
            <Ionicons
              name={starred ? 'star' : 'star-outline'}
              size={28}
              color={starred ? themePalette.warning : themePalette.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Product name */}
        <Text h3 style={styles.productName}>{product.name}</Text>

        {/* Rating and reviews */}
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color={themePalette.primary} />
          <Text style={styles.ratingText}>
            {product.rating} ({product.reviewCount} reviews)
          </Text>
        </View>

        <Divider style={styles.divider} />

        {/* Price section */}
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>${product.originalPrice}</Text>
          <Text h2 style={styles.currentPrice}>${product.price}</Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* Skin Concerns */}
        <Text h4 style={styles.sectionTitle}>Skin Concerns</Text>
        <View style={styles.concernsContainer}>
          {product.skinConcerns.map((concern, index) => (
            <View key={index} style={styles.concernBadge}>
              <Text style={styles.concernText}>{concern}</Text>
            </View>
          ))}
        </View>

        <Divider style={styles.divider} />

        {/* Collapsible Description */}
        <CollapsibleSection
          title="Description"
          expanded={descriptionExpanded}
          onToggle={() => setDescriptionExpanded(!descriptionExpanded)}
        >
          <Text style={styles.bodyText}>{product.description}</Text>
        </CollapsibleSection>

        <Divider style={styles.divider} />

        {/* Collapsible Shipping Info */}
        <CollapsibleSection
          title="Shipping Information"
          expanded={shippingExpanded}
          onToggle={() => setShippingExpanded(!shippingExpanded)}
        >
          <Text style={styles.bodyText}>{product.shippingInfo}</Text>
        </CollapsibleSection>

        <Divider style={styles.divider} />

        {/* Add to Cart Button */}
        <Button
          title="Add to Cart"
          icon={() => (
            <Ionicons
              name="cart-outline"
              size={20}
              color={themePalette.white}
              style={{ marginRight: 10 }}
            />
          )}
          buttonStyle={styles.addToCartButton}
          containerStyle={styles.buttonContainer}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themePalette.background,
  },
  carouselContainer: {
    backgroundColor: themePalette.white,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: themePalette.white,
  },
  // Row that holds brand name and the star button side by side
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandText: {
    fontSize: 14,
    color: themePalette.textSecondary,
    fontFamily: 'Inter_600SemiBold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  starButton: {
    padding: 6,
  },
  productName: {
    marginVertical: 8,
    lineHeight: 28,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: themePalette.textSecondary,
    fontFamily: 'Inter_400Regular',
  },
  divider: {
    marginVertical: 15,
    backgroundColor: themePalette.secondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  originalPrice: {
    fontSize: 18,
    color: themePalette.textSecondary,
    textDecorationLine: 'line-through',
    marginRight: 10,
    fontFamily: 'Inter_400Regular',
  },
  currentPrice: {
    color: themePalette.primary,
    marginVertical: 0,
    marginRight: 10,
  },
  discountBadge: {
    backgroundColor: themePalette.discount,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  discountText: {
    color: themePalette.white,
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
  },
  sectionTitle: {
    marginBottom: 10,
  },
  concernsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  concernBadge: {
    backgroundColor: themePalette.sidebar,
    borderWidth: 1,
    borderColor: themePalette.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  concernText: {
    fontSize: 12,
    color: themePalette.textPrimary,
    fontFamily: 'Inter_500Medium',
  },
  bodyText: {
    fontSize: 14,
    color: themePalette.textPrimary,
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
  },
  addToCartButton: {
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
});
