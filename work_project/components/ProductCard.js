// components/ProductCard.js
// Reusable product card component for displaying products in the FlatList
// Includes a star/favourite button that persists via AsyncStorage (Req 4)

import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Image, Avatar } from '@rneui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';
import { themePalette } from '../themes/oliveYoungTheme';

// Import useFavourites from shared context so star syncs with detail screen
import { useFavourites } from '../context/FavouritesContext';

export default function ProductCard({ product, onPress }) {
  // Load favourites state and toggle function from AsyncStorage hook
  const { isFavourite, toggleFavourite } = useFavourites();
  const starred = isFavourite(product.id);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Product Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={product.imageUri}
          style={styles.productImage}
          resizeMode="cover"
        />

        {/* Discount Badge */}
        {product.originalPrice > product.price && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </Text>
          </View>
        )}

        {/* Star / Favourite button — overlaid on top-left of image */}
        {/* Wrapped in its own TouchableOpacity so it doesn't trigger onPress of the card */}
        <TouchableOpacity
          style={styles.starButton}
          onPress={(e) => {
            e.stopPropagation(); // prevent card navigation triggering
            toggleFavourite(product.id);
          }}
          activeOpacity={0.7}
          accessibilityLabel={starred ? 'Remove from favourites' : 'Add to favourites'}
        >
          <Ionicons
            name={starred ? 'star' : 'star-outline'}
            size={26}
            color={starred ? themePalette.warning : themePalette.white}
          />
        </TouchableOpacity>
      </View>

      {/* Product Info */}
      <View style={styles.infoContainer}>
        {/* Brand with Avatar icon */}
        <View style={styles.brandContainer}>
          <Avatar
            size={24}
            rounded
            title={product.brand.substring(0, 2)}
            containerStyle={styles.brandAvatar}
          />
          <Text style={styles.brandText}>{product.brand}</Text>
        </View>

        {/* Product Name */}
        <Text h4 style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>

        {/* Rating display with star icon */}
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color={themePalette.primary} />
          <Text style={styles.ratingText}>
            {product.rating} ({product.reviewCount})
          </Text>
        </View>

        {/* Price Section */}
        <View style={styles.priceContainer}>
          {product.originalPrice > product.price && (
            <Text style={styles.originalPrice}>${product.originalPrice}</Text>
          )}
          <Text style={styles.currentPrice}>${product.price}</Text>
        </View>

        {/* Category badge */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{product.category}</Text>
        </View>

        {/* View details arrow */}
        <View style={styles.buttonContainer}>
          <Ionicons name="arrow-forward-circle" size={28} color={themePalette.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: themePalette.white,
    borderRadius: 12,
    marginBottom: 15,
    marginHorizontal: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: themePalette.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 250,
    backgroundColor: themePalette.secondary,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
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
  // Star button overlaid on top-left corner of the product image
  starButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 20,
    padding: 6,
  },
  infoContainer: {
    padding: 15,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  brandAvatar: {
    backgroundColor: themePalette.primary,
    marginRight: 8,
  },
  brandText: {
    fontSize: 12,
    color: themePalette.textSecondary,
    fontFamily: 'Inter_600SemiBold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  productName: {
    marginVertical: 5,
    lineHeight: 22,
    minHeight: 44,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 12,
    color: themePalette.textSecondary,
    fontFamily: 'Inter_400Regular',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: themePalette.textSecondary,
    textDecorationLine: 'line-through',
    marginRight: 8,
    fontFamily: 'Inter_400Regular',
  },
  currentPrice: {
    fontSize: 20,
    color: themePalette.primary,
    fontFamily: 'Inter_700Bold',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: themePalette.sidebar,
    borderWidth: 1,
    borderColor: themePalette.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    marginVertical: 5,
  },
  categoryText: {
    fontSize: 10,
    color: themePalette.textPrimary,
    fontFamily: 'Inter_600SemiBold',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginTop: 5,
  },
});
