import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

interface RouteCardProps {
  name: string;
  desc: string;
}

const RouteCard: React.FC<RouteCardProps> = ({ name, desc }) => (
  <BlurView intensity={70} tint="dark" style={styles.card}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.desc}>{desc}</Text>
  </BlurView>
);

const styles = StyleSheet.create({
  card: {
    width: 300,
    padding: 20,
    borderRadius: 18,
    backgroundColor: 'rgba(24,28,36,0.55)',
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 6,
  },
  desc: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RouteCard; 