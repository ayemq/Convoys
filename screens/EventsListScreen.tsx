import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import EventCard from '../components/EventCard';
import { useNavigation } from '@react-navigation/native';

const initialEvents = [
  { id: 'e1', name: 'Cars & Coffee', verified: true, date: 'Today, 9:00 AM', attendees: 24 },
  { id: 'e2', name: 'Photo Meet', verified: false, date: 'Tomorrow, 2:00 PM', attendees: 12 },
  { id: 'e3', name: 'General Meet', verified: false, date: 'Saturday, 6:00 PM', attendees: 8 },
];

const EventsListScreen = () => {
  const { isDark, accent } = useTheme();
  const navigation = useNavigation();
  const [events, setEvents] = useState(initialEvents);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({ name: '', verified: false });

  const accentColor = accent === 'orange' ? '#FF6B35' : 
                     accent === 'blue' ? '#4ECDC4' : 
                     accent === 'red' ? '#FF6B6B' : '#A8E6CF';

  const gradientColors = isDark 
    ? ['#1A1A2E', '#16213E', '#0F3460'] as const
    : ['#667eea', '#764ba2', '#f093fb'] as const;

  const handleCreateEvent = () => {
    if (!newEvent.name) return;
    setEvents(prev => [
      { 
        id: `e${prev.length + 1}`, 
        name: newEvent.name, 
        verified: newEvent.verified,
        date: 'TBD',
        attendees: 0
      },
      ...prev,
    ]);
    setNewEvent({ name: '', verified: false });
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0A0A0A' : '#F8F9FA' }]}>
      {/* Header with gradient background */}
      <LinearGradient colors={gradientColors} style={styles.headerGradient}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Events</Text>
          <Text style={styles.headerSubtitle}>Discover and join car meets</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.statsContainer}>
          <BlurView intensity={80} tint={isDark ? 'dark' : 'light'} style={styles.statCard}>
            <Text style={styles.statNumber}>{events.length}</Text>
            <Text style={styles.statLabel}>Total Events</Text>
          </BlurView>
          <BlurView intensity={80} tint={isDark ? 'dark' : 'light'} style={styles.statCard}>
            <Text style={styles.statNumber}>{events.filter(e => e.verified).length}</Text>
            <Text style={styles.statLabel}>Verified</Text>
          </BlurView>
          <BlurView intensity={80} tint={isDark ? 'dark' : 'light'} style={styles.statCard}>
            <Text style={styles.statNumber}>{events.reduce((sum, e) => sum + e.attendees, 0)}</Text>
            <Text style={styles.statLabel}>Attendees</Text>
          </BlurView>
        </View>

        {/* Create Event Button */}
        <TouchableOpacity 
          style={[styles.createBtn, { backgroundColor: accentColor }]} 
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.createText}>Create Event</Text>
        </TouchableOpacity>

        {/* Events List */}
        <BlurView intensity={80} tint={isDark ? 'dark' : 'light'} style={styles.eventsCard}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {events.map(event => (
            <TouchableOpacity 
              key={event.id} 
              onPress={() => navigation.navigate('EventDetail' as never)}
              style={styles.eventItem}
            >
              <View style={styles.eventInfo}>
                <View style={styles.eventHeader}>
                  <Text style={styles.eventName}>{event.name}</Text>
                  {event.verified && (
                    <View style={[styles.verifiedBadge, { backgroundColor: accentColor }]}>
                      <Ionicons name="shield-checkmark" size={12} color="#fff" />
                    </View>
                  )}
                </View>
                <View style={styles.eventDetails}>
                  <View style={styles.eventDetail}>
                    <Ionicons name="time" size={14} color="rgba(255,255,255,0.7)" />
                    <Text style={styles.eventDate}>{event.date}</Text>
                  </View>
                  <View style={styles.eventDetail}>
                    <Ionicons name="people" size={14} color="rgba(255,255,255,0.5)" />
                    <Text style={styles.eventAttendees}>{event.attendees} attending</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.eventArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </BlurView>
      </ScrollView>

      {/* Create Event Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBg}>
          <BlurView intensity={80} tint={isDark ? 'dark' : 'light'} style={styles.modalCard}>
            <Text style={styles.modalTitle}>Create New Event</Text>
            <Text style={styles.modalSubtitle}>Organize a car meet for the community</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Event Name</Text>
              <TextInput
                style={styles.input}
                value={newEvent.name}
                onChangeText={name => setNewEvent(ev => ({ ...ev, name }))}
                placeholder="e.g., Cars & Coffee, Photo Meet"
                placeholderTextColor="rgba(255,255,255,0.5)"
              />
            </View>
            
            <TouchableOpacity
              style={[
                styles.verifyBtn, 
                { 
                  borderColor: accentColor, 
                  backgroundColor: newEvent.verified ? accentColor : 'rgba(255,255,255,0.1)' 
                }
              ]}
              onPress={() => setNewEvent(ev => ({ ...ev, verified: !ev.verified }))}
            >
              <Ionicons name="shield-checkmark" size={16} color={newEvent.verified ? '#fff' : accentColor} />
              <Text style={[styles.verifyText, { color: newEvent.verified ? '#fff' : accentColor }]}>
                {newEvent.verified ? '✓' : '○'} Verified Club Event
              </Text>
            </TouchableOpacity>
            
            <View style={styles.modalRow}>
              <TouchableOpacity 
                style={[styles.modalBtn, { backgroundColor: '#666' }]} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalBtn, { backgroundColor: accentColor }]} 
                onPress={handleCreateEvent}
              >
                <Text style={styles.modalBtnText}>Create Event</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
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