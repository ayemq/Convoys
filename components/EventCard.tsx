import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

interface EventCardProps {
  name: string;
  verified?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ name, verified }) => (
  <BlurView intensity={70} tint="dark" style={styles.card}>
    <Text style={styles.name}>{name}</Text>
    {verified && <Text style={styles.verified}>✔️ Verified</Text>}
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
  verified: {
    color: '#FF9100',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EventCard; 