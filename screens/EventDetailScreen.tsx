import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../context/ThemeContext';
import { useRoute } from '@react-navigation/native';

const mockEventDetails = {
  e1: {
    name: 'Cars & Coffee',
    verified: true,
    description: 'A relaxed morning meet for car enthusiasts. Coffee and pastries provided.',
    rules: 'No burnouts. Respect the lot. Family friendly.',
    time: 'Sat, 9am - 12pm',
    location: '123 Main St, San Francisco',
  },
  e2: {
    name: 'Photo Meet',
    verified: false,
    description: 'Bring your ride for a group photoshoot. All builds welcome.',
    rules: 'Be on time. Park as directed.',
    time: 'Sun, 2pm - 5pm',
    location: 'Pier 39, San Francisco',
  },
  e3: {
    name: 'General Meet',
    verified: false,
    description: 'Open meet for all car clubs and solo drivers.',
    rules: 'No revving. No littering.',
    time: 'Fri, 7pm - 10pm',
    location: 'Mall Parking Lot, Daly City',
  },
};

const EventDetailScreen = () => {
  const { isDark } = useTheme();
  const route = useRoute();
  // @ts-ignore
  const { eventId } = route.params || { eventId: 'e1' };
  const event = mockEventDetails[eventId as keyof typeof mockEventDetails];
  if (!event) return <View style={styles.centered}><Text style={styles.text}>Event not found.</Text></View>;
  return (
    <ScrollView style={{ backgroundColor: isDark ? '#181C24' : '#f5f5f5' }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}> 
        <BlurView intensity={70} tint={isDark ? 'dark' : 'light'} style={styles.card}>
          <Text style={styles.name}>{event.name}</Text>
          {event.verified && <Text style={styles.verified}>✔️ Verified Event</Text>}
          <Text style={styles.label}>Description</Text>
          <Text style={styles.text}>{event.description}</Text>
          <Text style={styles.label}>Rules</Text>
          <Text style={styles.text}>{event.rules}</Text>
          <Text style={styles.label}>Time</Text>
          <Text style={styles.text}>{event.time}</Text>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.text}>{event.location}</Text>
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
  verified: {
    color: '#FF9100',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
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

export default EventDetailScreen; 