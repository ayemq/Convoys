import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import RouteCard from '../components/RouteCard';
import { useNavigation } from '@react-navigation/native';

// TODO: Replace with backend suggested routes fetch
const routes: any[] = []; // Placeholder for routes from backend

const SuggestedRoutesScreen = () => {
  const { isDark } = useTheme();
  const navigation = useNavigation();
  return (
    <ScrollView style={{ backgroundColor: '#000' }} contentContainerStyle={{ padding: 32 }}>
      <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'left' }}>Suggested Routes</Text>
      {routes.length === 0 ? (
        <Text style={{ color: '#aaa', fontSize: 16 }}>No routes yet. Connect to backend to see suggested routes.</Text>
      ) : (
        routes.map(route => (
          // @ts-ignore
          <TouchableOpacity key={route.id} onPress={() => navigation.navigate('RouteDetail', { routeId: route.id })} style={{ backgroundColor: '#18181b', borderRadius: 16, padding: 20, marginBottom: 16 }}>
            <RouteCard name={route.name} desc={route.desc} />
          </TouchableOpacity>
        ))
      )}
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