import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import EventCard from '../components/EventCard';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

const initialEvents = [
  { id: 'e1', name: 'Cars & Coffee', verified: true },
  { id: 'e2', name: 'Photo Meet', verified: false },
  { id: 'e3', name: 'General Meet', verified: false },
];

const EventsListScreen = () => {
  const { isDark, accent } = useTheme();
  const navigation = useNavigation();
  const [events, setEvents] = useState(initialEvents);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({ name: '', verified: false });

  const accentColor =
    accent === 'orange' ? '#FF9100' : accent === 'blue' ? '#2196F3' : accent === 'red' ? '#F44336' : '#9C27B0';

  const handleCreateEvent = () => {
    if (!newEvent.name) return;
    setEvents(prev => [
      { id: `e${prev.length + 1}`, name: newEvent.name, verified: newEvent.verified },
      ...prev,
    ]);
    setNewEvent({ name: '', verified: false });
    setModalVisible(false);
  };

  return (
    <ScrollView style={{ backgroundColor: isDark ? '#181C24' : '#f5f5f5' }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}> 
        <Text style={styles.title}>Upcoming Events</Text>
        <TouchableOpacity style={[styles.createBtn, { backgroundColor: accentColor }]} onPress={() => setModalVisible(true)}>
          <Text style={styles.createText}>+ Create Event</Text>
        </TouchableOpacity>
        {events.map(event => (
          <TouchableOpacity key={event.id} onPress={() => navigation.navigate('EventDetail', { eventId: event.id })}>
            <EventCard name={event.name} verified={event.verified} />
          </TouchableOpacity>
        ))}
        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalBg}>
            <BlurView intensity={80} tint={isDark ? 'dark' : 'light'} style={styles.modalCard}>
              <Text style={styles.modalTitle}>Create Event</Text>
              <TextInput
                style={styles.input}
                value={newEvent.name}
                onChangeText={name => setNewEvent(ev => ({ ...ev, name }))}
                placeholder="Event Name"
                placeholderTextColor="#888"
              />
              <TouchableOpacity
                style={[styles.verifyBtn, { borderColor: accentColor, backgroundColor: newEvent.verified ? accentColor : 'transparent' }]}
                onPress={() => setNewEvent(ev => ({ ...ev, verified: !ev.verified }))}
              >
                <Text style={[styles.verifyText, { color: newEvent.verified ? '#fff' : accentColor }]}>Verified Club Event</Text>
              </TouchableOpacity>
              <View style={styles.modalRow}>
                <TouchableOpacity style={[styles.modalBtn, { backgroundColor: accentColor }]} onPress={handleCreateEvent}>
                  <Text style={styles.modalBtnText}>Create</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#888' }]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalBtnText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </BlurView>
          </View>
        </Modal>
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
  createBtn: {
    marginBottom: 18,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  createText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: 320,
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 12,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    width: '100%',
  },
  verifyBtn: {
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginBottom: 14,
  },
  verifyText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalBtn: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EventsListScreen; 