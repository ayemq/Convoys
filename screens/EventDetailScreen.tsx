import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../context/ThemeContext';
import { useRoute } from '@react-navigation/native';

// TODO: Replace with backend event details fetch
const event: any = undefined; // Placeholder for event data from backend

const EventDetailScreen = () => {
  const { isDark } = useTheme();
  const route = useRoute();
  // @ts-ignore
  const { eventId } = route.params || { eventId: 'e1' };
  if (!event) return <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff', fontSize: 20 }}>Event details will appear here once connected to backend.</Text></View>;
  return (
    <ScrollView style={{ backgroundColor: '#000' }} contentContainerStyle={{ padding: 32 }}>
      <View style={{ backgroundColor: '#18181b', borderRadius: 20, padding: 28 }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24, marginBottom: 12, textAlign: 'left' }}>{event.name}</Text>
        {event.verified && <Text style={{ color: '#8f5cff', fontWeight: 'bold', fontSize: 16, marginBottom: 12, textAlign: 'left' }}>✔️ Verified Event</Text>}
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, marginTop: 12, marginBottom: 2, textAlign: 'left' }}>Description</Text>
        <Text style={{ color: '#aaa', fontSize: 16, marginBottom: 2, textAlign: 'left' }}>{event.description}</Text>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, marginTop: 12, marginBottom: 2, textAlign: 'left' }}>Rules</Text>
        <Text style={{ color: '#aaa', fontSize: 16, marginBottom: 2, textAlign: 'left' }}>{event.rules}</Text>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, marginTop: 12, marginBottom: 2, textAlign: 'left' }}>Time</Text>
        <Text style={{ color: '#aaa', fontSize: 16, marginBottom: 2, textAlign: 'left' }}>{event.time}</Text>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, marginTop: 12, marginBottom: 2, textAlign: 'left' }}>Location</Text>
        <Text style={{ color: '#aaa', fontSize: 16, marginBottom: 2, textAlign: 'left' }}>{event.location}</Text>
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