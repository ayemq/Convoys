import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Modal, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import MapUserIcon from '../components/MapUserIcon';
import VisibilityToggle from '../components/VisibilityToggle';
import EventPin from '../components/EventPin';

const { width, height } = Dimensions.get('window');

// Mock friends and events
const mockFriends = [
  {
    id: '1',
    username: 'FastFury',
    carPhoto: undefined,
    mood: 'Racing',
    location: { latitude: 37.779, longitude: -122.42 },
  },
  {
    id: '2',
    username: 'PhotoQueen',
    carPhoto: undefined,
    mood: 'Photoshoot',
    location: { latitude: 37.77, longitude: -122.41 },
  },
];
const mockEvents = [
  {
    id: 'e1',
    name: 'Cars & Coffee',
    type: 'cars_and_coffee',
    verified: true,
    location: { latitude: 37.775, longitude: -122.418 },
  },
  {
    id: 'e2',
    name: 'Photo Meet',
    type: 'photo_meet',
    verified: false,
    location: { latitude: 37.772, longitude: -122.415 },
  },
];

const ExploreDriverMapScreen = () => {
  const { profile } = useUser();
  const { isDark } = useTheme();
  const [visibility, setVisibility] = useState<'public' | 'friends' | 'ghost'>('public');
  const [selectedFriend, setSelectedFriend] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Example: fixed user location (San Francisco)
  const userLocation = { latitude: 37.7749, longitude: -122.4194 };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#181C24' : '#f5f5f5' }]}> 
      <MapView
        style={styles.map}
        initialRegion={{
          ...userLocation,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        customMapStyle={isDark ? darkMapStyle : []}
      >
        {profile && visibility !== 'ghost' && (
          <Marker coordinate={userLocation}>
            <MapUserIcon imageUrl={profile.role === 'driver' ? profile.carPhoto : profile.clubLogo} mood={profile.mood} />
          </Marker>
        )}
        {visibility !== 'ghost' && mockFriends.map(friend => (
          <Marker key={friend.id} coordinate={friend.location} onPress={() => setSelectedFriend(friend)}>
            <MapUserIcon imageUrl={friend.carPhoto} mood={friend.mood} />
          </Marker>
        ))}
        {mockEvents.map(event => (
          <Marker key={event.id} coordinate={event.location} onPress={() => setSelectedEvent(event)}>
            <EventPin verified={event.verified} />
          </Marker>
        ))}
      </MapView>
      <View style={styles.overlay}>
        <VisibilityToggle value={visibility} onChange={setVisibility} />
      </View>
      <Modal visible={!!selectedFriend} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{selectedFriend?.username}</Text>
            <Text style={styles.modalText}>Mood: {selectedFriend?.mood}</Text>
            <TouchableOpacity onPress={() => setSelectedFriend(null)} style={styles.closeBtn}><Text style={styles.closeText}>Close</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={!!selectedEvent} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{selectedEvent?.name}</Text>
            <Text style={styles.modalText}>{selectedEvent?.verified ? 'Verified Event' : 'Community Event'}</Text>
            <TouchableOpacity onPress={() => setSelectedEvent(null)} style={styles.closeBtn}><Text style={styles.closeText}>Close</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#212b36' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#b0b0b0' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#212b36' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#181C24' }] },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
  overlay: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#222',
    borderRadius: 18,
    padding: 28,
    alignItems: 'center',
    minWidth: 220,
  },
  modalTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 8,
  },
  modalText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
  },
  closeBtn: {
    backgroundColor: '#FF9100',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ExploreDriverMapScreen; 