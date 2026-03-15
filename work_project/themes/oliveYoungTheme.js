// themes/oliveYoungTheme.js
// Theme configuration for Olive Young app using React Native Elements
// Defines color palette and component styling

import { createTheme } from '@rneui/themed';

// Color palette based on Olive Young brand colors
export const themePalette = {
  primary: '#A7CE49',        // Logo and border color (green)
  sidebar: '#F0F7DE',        // Sidebar menu background (light green)
  background: '#FAFAFA',     // Main background (off-white)
  secondary: '#F1F1F1',      // Search bar, categories background (light gray)
  white: '#FFFFFF',
  black: '#000000',
  textPrimary: '#333333',
  textSecondary: '#666666',
  discount: '#FF4D4D',
  success: '#4CAF50',
  warning: '#FFC107',
};

// Create the theme object using createTheme from RNE
export const oliveYoungTheme = createTheme({
  components: {
    // Text component styles - used for headings and paragraphs
    Text: {
      h1Style: {
        fontSize: 32,
        fontWeight: 'bold',
        color: themePalette.textPrimary,
        fontFamily: 'Inter_700Bold',
        marginVertical: 10,
      },
      h2Style: {
        fontSize: 24,
        fontWeight: '600',
        color: themePalette.textPrimary,
        fontFamily: 'Inter_600SemiBold',
        marginVertical: 8,
      },
      h3Style: {
        fontSize: 20,
        fontWeight: '600',
        color: themePalette.textPrimary,
        fontFamily: 'Inter_600SemiBold',
        marginVertical: 6,
      },
      h4Style: {
        fontSize: 16,
        fontWeight: '500',
        color: themePalette.textPrimary,
        fontFamily: 'Inter_500Medium',
        marginVertical: 4,
      },
      style: {
        fontSize: 14,
        color: themePalette.textPrimary,
        fontFamily: 'Inter_400Regular',
      },
    },
    
    // Button component styles
    Button: {
      buttonStyle: {
        backgroundColor: themePalette.primary,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
      },
      titleStyle: {
        fontSize: 16,
        fontWeight: '600',
        color: themePalette.white,
        fontFamily: 'Inter_600SemiBold',
      },
      disabledStyle: {
        backgroundColor: themePalette.secondary,
      },
      disabledTitleStyle: {
        color: themePalette.textSecondary,
      },
    },
    
    // Card component styles
    Card: {
      containerStyle: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: themePalette.primary,
        padding: 0,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
    },
    
    // ListItem component styles
    ListItem: {
      containerStyle: {
        backgroundColor: themePalette.white,
        borderBottomWidth: 1,
        borderBottomColor: themePalette.secondary,
        paddingVertical: 12,
      },
    },
    
    // Image component styles
    Image: {
      style: {
        resizeMode: 'cover',
      },
    },
    
    // Icon component styles
    Icon: {
      color: themePalette.primary,
      size: 24,
    },
    
    // Avatar component styles - used for brand logos
    Avatar: {
      rounded: true,
      size: 'medium',
      overlayContainerStyle: {
        backgroundColor: themePalette.secondary,
      },
    },
  },
});