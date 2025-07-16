import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import TileButton from '../components/TileButton';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const WhereToGoSelectionScreen = () => {
  const { isDark } = useTheme();
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'flex-start', padding: 32 }}>
      <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'left' }}>Where to Go</Text>
      <TouchableOpacity style={{ backgroundColor: '#8f5cff', borderRadius: 16, paddingVertical: 20, paddingHorizontal: 32, marginBottom: 16, width: '100%' }} onPress={() => navigation.navigate('EventsList' as never)}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>Events</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor: '#18181b', borderRadius: 16, paddingVertical: 20, paddingHorizontal: 32, width: '100%' }} onPress={() => navigation.navigate('SuggestedRoutes' as never)}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>Suggested Routes</Text>
      </TouchableOpacity>
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