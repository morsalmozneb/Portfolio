// Reusable accordion component 
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from '@rneui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';
import { themePalette } from '../themes/oliveYoungTheme';

export default function CollapsibleSection({ title, children, expanded, onToggle }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity 
        style={styles.header} 
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <Text h4 style={styles.title}>{title}</Text>
        
        {/* Arrow icon */}
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={themePalette.primary}
        />
      </TouchableOpacity>

      {/* Content */}
      {expanded && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  title: {
    marginVertical: 0,
    flex: 1,
  },
  content: {
    paddingVertical: 10,
    paddingRight: 5,
  },
});