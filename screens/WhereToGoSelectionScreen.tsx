import React from 'react';
import { View, StyleSheet } from 'react-native';
import TileButton from '../components/TileButton';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const WhereToGoSelectionScreen = () => {
  const { isDark } = useTheme();
  const navigation = useNavigation();
  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#181C24' : '#f5f5f5' }]}> 
      <TileButton label="Events" position="top" onPress={() => navigation.navigate('EventsList')} />
      <TileButton label="Suggested Routes" position="bottom" onPress={() => navigation.navigate('SuggestedRoutes')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
});

export default WhereToGoSelectionScreen; 