import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import RouteCard from '../components/RouteCard';
import { useNavigation } from '@react-navigation/native';

const mockRoutes = [
  { id: 'r1', name: 'Pacific Coast Highway', desc: 'Scenic ocean drive from SF to LA.' },
  { id: 'r2', name: 'Skyline Blvd', desc: 'Twisty mountain road with epic views.' },
  { id: 'r3', name: 'Napa Valley Loop', desc: 'Wine country cruise through vineyards.' },
];

const SuggestedRoutesScreen = () => {
  const { isDark } = useTheme();
  const navigation = useNavigation();
  return (
    <ScrollView style={{ backgroundColor: isDark ? '#181C24' : '#f5f5f5' }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}> 
        <Text style={styles.title}>Suggested Routes</Text>
        {mockRoutes.map(route => (
          <TouchableOpacity key={route.id} onPress={() => navigation.navigate('RouteDetail', { routeId: route.id })}>
            <RouteCard name={route.name} desc={route.desc} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 32,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 18,
  },
});

export default SuggestedRoutesScreen; 