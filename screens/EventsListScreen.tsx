import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import EventCard from '../components/EventCard';
import { useNavigation } from '@react-navigation/native';

// TODO: Replace with backend events fetch
const [events, setEvents] = useState([]); // Placeholder for events from backend
const [modalVisible, setModalVisible] = useState(false);
const [newEvent, setNewEvent] = useState({ name: '', verified: false });

const handleCreateEvent = async () => {
    if (!newEvent.name) return;
    // TODO: Replace with backend event creation API call
    // Example:
    // const result = await createEventApi(newEvent);
    // if (result.success) setEvents([...events, result.event]);
    Alert.alert('Not implemented', 'Event creation will be available once backend is connected.');
    setModalVisible(false);
};

const EventsListScreen = () => {
  const { isDark, accent } = useTheme();
  const navigation = useNavigation();
  // TODO: Replace with backend events fetch
  const [events, setEvents] = useState<any[]>([]); // Placeholder for events from backend
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({ name: '', verified: false });

  const handleCreateEvent = async () => {
    if (!newEvent.name) return;
    // TODO: Replace with backend event creation API call
    // Example:
    // const result = await createEventApi(newEvent);
    // if (result.success) setEvents([...events, result.event]);
    Alert.alert('Not implemented', 'Event creation will be available once backend is connected.');
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScrollView contentContainerStyle={{ padding: 32 }} showsVerticalScrollIndicator={false}>
        <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'left' }}>Events</Text>
        {/* Stats */}
        <View style={{ flexDirection: 'row', marginBottom: 24 }}>
          <View style={{ flex: 1, marginRight: 8, backgroundColor: '#18181b', borderRadius: 16, padding: 16 }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 4 }}>{events.length}</Text>
            <Text style={{ color: '#aaa', fontSize: 14 }}>Total Events</Text>
          </View>
          <View style={{ flex: 1, marginHorizontal: 4, backgroundColor: '#18181b', borderRadius: 16, padding: 16 }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 4 }}>{events.filter(e => e.verified).length}</Text>
            <Text style={{ color: '#aaa', fontSize: 14 }}>Verified</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 8, backgroundColor: '#18181b', borderRadius: 16, padding: 16 }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 4 }}>{events.reduce((sum, e) => sum + e.attendees, 0)}</Text>
            <Text style={{ color: '#aaa', fontSize: 14 }}>Attendees</Text>
          </View>
        </View>
        {/* Create Event Button */}
        <TouchableOpacity 
          style={{ backgroundColor: '#8f5cff', borderRadius: 16, paddingVertical: 16, alignItems: 'center', marginBottom: 20 }} 
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginLeft: 8 }}>Create Event</Text>
        </TouchableOpacity>
        {/* Events List */}
        <View style={{ backgroundColor: '#18181b', borderRadius: 20, padding: 20 }}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'left' }}>Upcoming Events</Text>
          {events.length === 0 ? (
            <Text style={{ color: '#aaa', fontSize: 16 }}>No events yet. Connect to backend to see events.</Text>
          ) : (
            events.map(event => (
              <TouchableOpacity 
                key={event.id} 
                onPress={() => navigation.navigate('EventDetail' as never)}
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' }}
              >
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600', marginRight: 8 }}>{event.name}</Text>
                    {event.verified && (
                      <View style={{ width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#8f5cff' }}>
                        <Ionicons name="shield-checkmark" size={12} color="#fff" />
                      </View>
                    )}
                  </View>
                  <View style={{ flexDirection: 'row', gap: 12 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Ionicons name="time" size={14} color="rgba(255,255,255,0.7)" />
                      <Text style={{ color: '#aaa', fontSize: 14 }}>{event.date}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Ionicons name="people" size={14} color="rgba(255,255,255,0.5)" />
                      <Text style={{ color: '#aaa', fontSize: 12 }}>{event.attendees} attending</Text>
                    </View>
                  </View>
                </View>
                <Text style={{ color: '#aaa', fontSize: 18, fontWeight: 'bold' }}>→</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
      {/* Create Event Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
          <View style={{ width: '100%', maxWidth: 340, borderRadius: 20, padding: 24, backgroundColor: '#18181b' }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, marginBottom: 4 }}>Create New Event</Text>
            <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 20 }}>Organize a car meet for the community</Text>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: '600', fontSize: 16, color: '#fff', marginBottom: 8 }}>Event Name</Text>
              <TextInput
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 12, paddingVertical: 16, paddingHorizontal: 16, fontSize: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}
                value={newEvent.name}
                onChangeText={name => setNewEvent(ev => ({ ...ev, name }))}
                placeholder="e.g., Cars & Coffee, Photo Meet"
                placeholderTextColor="rgba(255,255,255,0.5)"
              />
            </View>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16, marginBottom: 24, gap: 8, borderColor: '#8f5cff', backgroundColor: newEvent.verified ? '#8f5cff' : 'rgba(255,255,255,0.1)' }}
              onPress={() => setNewEvent(ev => ({ ...ev, verified: !ev.verified }))}
            >
              <Ionicons name="shield-checkmark" size={16} color={newEvent.verified ? '#fff' : '#8f5cff'} />
              <Text style={{ fontWeight: '600', fontSize: 16, color: newEvent.verified ? '#fff' : '#8f5cff' }}>{newEvent.verified ? '✓' : '○'} Verified Club Event</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity 
                style={{ flex: 1, borderRadius: 12, paddingVertical: 12, alignItems: 'center', backgroundColor: '#666' }} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={{ flex: 1, borderRadius: 12, paddingVertical: 12, alignItems: 'center', backgroundColor: '#8f5cff' }} 
                onPress={handleCreateEvent}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Create Event</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  createText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  eventsCard: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  eventInfo: {
    flex: 1,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
  verifiedBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventDetails: {
    gap: 4,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eventDate: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  eventAttendees: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
  eventArrow: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: 'bold',
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  modalTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 4,
  },
  modalSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  verifyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 8,
  },
  verifyText: {
    fontWeight: '600',
    fontSize: 16,
  },
  modalRow: {
    flexDirection: 'row',
    gap: 12,
  },
  modalBtn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EventsListScreen; 