import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../context/ThemeContext';
import { useRoute } from '@react-navigation/native';

// TODO: Replace with backend route details fetch
const routeData: any = undefined; // Placeholder for route data from backend

const RouteDetailScreen = () => {
  const { isDark } = useTheme();
  const route = useRoute();
  // @ts-ignore
  const { routeId } = route.params || { routeId: 'r1' };
  // TODO: Replace with backend route details fetch
  const routeData = undefined as any; // Placeholder for route data from backend
  if (!routeData) return <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff', fontSize: 20 }}>Route details will appear here once connected to backend.</Text></View>;
  return (
    <ScrollView style={{ backgroundColor: '#000' }} contentContainerStyle={{ padding: 32 }}>
      <View style={{ backgroundColor: '#18181b', borderRadius: 20, padding: 28 }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24, marginBottom: 12, textAlign: 'left' }}>{routeData && routeData.name ? routeData.name : ''}</Text>
        <Text style={{ color: '#aaa', fontSize: 16, marginBottom: 10, textAlign: 'left' }}>{routeData && routeData.desc ? routeData.desc : ''}</Text>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, marginTop: 12, marginBottom: 2, textAlign: 'left' }}>Waypoints</Text>
        {(routeData && routeData.waypoints ? routeData.waypoints : []).map((wp: any, i: number) => (
          <Text key={i} style={{ color: '#fff', fontSize: 16, marginBottom: 2, textAlign: 'left' }}>{wp}</Text>
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
  card: {
    width: 340,
    padding: 28,
    borderRadius: 28,
    backgroundColor: 'rgba(24,28,36,0.55)',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    alignItems: 'center',
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 6,
  },
  desc: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 12,
    marginBottom: 2,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 2,
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RouteDetailScreen; 