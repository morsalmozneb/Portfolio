// Product list screen 

import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Text } from '@rneui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';
import { themePalette } from '../themes/oliveYoungTheme';
import { getAllProducts } from '../data/product-data';
import ProductCard from '../components/ProductCard';

export default function ProductListScreen({ navigation }) {
  // Get all products from data file
  const products = getAllProducts();

  // Render function for each product item in the FlatList
  // Called once for each product in the array
  const renderItem = ({ item }) => (
    <ProductCard 
      product={item} 
      onPress={() => {
        // Navigate to detail screen and pass product Id
        navigation.navigate('ProductDetail', { productId: item.id });
      }}
    />
  );

  return (
    <View style={styles.container}>
      {/* Header section with title and product count */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTextContainer}>
          <Text h2 style={styles.headerText}>
            Skincare Collection
          </Text>
          <Text style={styles.subheaderText}>
            {products.length} Products Available
          </Text>
        </View>
      </View>

      {/* FlatList to display products */}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themePalette.background,
  },
  headerContainer: {
    padding: 20,
    backgroundColor: themePalette.white,
    borderBottomWidth: 1,
    borderBottomColor: themePalette.secondary,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: themePalette.sidebar,
    borderWidth: 2,
    borderColor: themePalette.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: themePalette.primary,
    letterSpacing: 1,
  },
  headerTextContainer: {
    marginTop: 5,
  },
  headerText: {
    marginVertical: 0,
  },
  subheaderText: {
    fontSize: 14,
    color: themePalette.textSecondary,
    fontFamily: 'Inter_400Regular',
    marginTop: 5,
  },
  listContainer: {
    padding: 10,
  },
});