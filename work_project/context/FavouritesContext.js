// context/FavouritesContext.js
// Global favourites state shared across all screens using React Context
// This ensures the star is in sync between ProductCard (list) and ProductDetailScreen (detail)
// Uses AsyncStorage for persistence (Req 4) with async/await and try/catch

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage key
const FAVOURITES_KEY = 'product_favourites';

// Create the context object
const FavouritesContext = createContext(null);

// ─── Provider ────────────────────────────────────────────────────────────────
// Wrap the app in this so all screens share the same favourites state
export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(new Set());

  // Load saved favourites from AsyncStorage on first mount (Req 4)
  useEffect(() => {
    const load = async () => {
      try {
        // getItem returns null if key has never been set
        const stored = await AsyncStorage.getItem(FAVOURITES_KEY);
        if (stored !== null) {
          setFavourites(new Set(JSON.parse(stored)));
        }
      } catch (error) {
        console.error('FavouritesContext load error:', error);
      }
    };
    load();
  }, []);

  // Toggle a product's starred state and persist to AsyncStorage (Req 4)
  const toggleFavourite = async (productId) => {
    try {
      const updated = new Set(favourites);
      if (updated.has(productId)) {
        updated.delete(productId);
      } else {
        updated.add(productId);
      }
      // Persist first, then update state so UI reflects saved data
      await AsyncStorage.setItem(FAVOURITES_KEY, JSON.stringify([...updated]));
      setFavourites(updated);
    } catch (error) {
      console.error('FavouritesContext toggle error:', error);
    }
  };

  // Helper: returns true if productId is currently starred
  const isFavourite = (productId) => favourites.has(productId);

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite, isFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
// Use this in any screen/component instead of useFavourites()
// It reads from the single shared context instance
export function useFavourites() {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavourites must be used inside FavouritesProvider');
  }
  return context;
}
