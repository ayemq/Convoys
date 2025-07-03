import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../context/ThemeContext';
import { useRoute } from '@react-navigation/native';

const mockRouteDetails = {
  r1: {
    name: 'Pacific Coast Highway',
    desc: 'Scenic ocean drive from SF to LA.',
    waypoints: ['San Francisco', 'Half Moon Bay', 'Santa Cruz', 'Big Sur', 'Los Angeles'],
  },
  r2: {
    name: 'Skyline Blvd',
    desc: 'Twisty mountain road with epic views.',
    waypoints: ['San Bruno', 'Skyline Blvd', "Alice's Restaurant", 'La Honda'],
  },
  r3: {
    name: 'Napa Valley Loop',
    desc: 'Wine country cruise through vineyards.',
    waypoints: ['Napa', 'Yountville', 'St. Helena', 'Calistoga', 'Napa'],
  },
};

const RouteDetailScreen = () => {
  const { isDark } = useTheme();
  const route = useRoute();
  // @ts-ignore
  const { routeId } = route.params || { routeId: 'r1' };
  const routeData = mockRouteDetails[routeId as keyof typeof mockRouteDetails];
  if (!routeData) return <View style={styles.centered}><Text style={styles.text}>Route not found.</Text></View>;
  return (
    <ScrollView style={{ backgroundColor: isDark ? '#181C24' : '#f5f5f5' }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}> 
        <BlurView intensity={70} tint={isDark ? 'dark' : 'light'} style={styles.card}>
          <Text style={styles.name}>{routeData.name}</Text>
          <Text style={styles.desc}>{routeData.desc}</Text>
          <Text style={styles.label}>Waypoints</Text>
          {routeData.waypoints.map((wp, i) => (
            <Text key={i} style={styles.text}>{wp}</Text>
          ))}
        </BlurView>
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