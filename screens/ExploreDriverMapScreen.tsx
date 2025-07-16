import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Modal, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import MapUserIcon from '../components/MapUserIcon';
import VisibilityToggle from '../components/VisibilityToggle';
import EventPin from '../components/EventPin';

const { width, height } = Dimensions.get('window');

// TODO: Replace with backend friends and events fetch
const friends: any[] = []; // Placeholder for friends from backend
const events: any[] = []; // Placeholder for events from backend

const ExploreDriverMapScreen = () => {
  const { profile } = useUser();
  const { isDark } = useTheme();
  const [visibility, setVisibility] = useState<'public' | 'friends' | 'ghost'>('public');
  const [selectedFriend, setSelectedFriend] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Example: fixed user location (San Francisco)
  const userLocation = { latitude: 40.9584, longitude: -74.0723 };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}> 
      <MapView
        style={{ width: '100%', height: '60%' }}
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
        {visibility !== 'ghost' && friends.map(friend => (
          <Marker key={friend.id} coordinate={friend.location} onPress={() => setSelectedFriend(friend)}>
            <MapUserIcon imageUrl={friend.carPhoto} mood={friend.mood} />
          </Marker>
        ))}
        {events.map(event => (
          <Marker key={event.id} coordinate={event.location} onPress={() => setSelectedEvent(event)}>
            <EventPin verified={event.verified} />
          </Marker>
        ))}
      </MapView>
      <View style={{ position: 'absolute', top: 40, left: 0, right: 0, alignItems: 'center' }}>
        <VisibilityToggle value={visibility} onChange={setVisibility} />
      </View>
      <Modal visible={!!selectedFriend} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#222', borderRadius: 18, padding: 28, alignItems: 'center', minWidth: 220 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 22, marginBottom: 8 }}>{selectedFriend?.username}</Text>
            <Text style={{ color: '#fff', fontSize: 16, marginBottom: 16 }}>Mood: {selectedFriend?.mood}</Text>
            <TouchableOpacity onPress={() => setSelectedFriend(null)} style={{ backgroundColor: '#8f5cff', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 24 }}><Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Close</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={!!selectedEvent} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#222', borderRadius: 18, padding: 28, alignItems: 'center', minWidth: 220 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 22, marginBottom: 8 }}>{selectedEvent?.name}</Text>
            <Text style={{ color: '#fff', fontSize: 16, marginBottom: 16 }}>{selectedEvent?.verified ? 'Verified Event' : 'Community Event'}</Text>
            <TouchableOpacity onPress={() => setSelectedEvent(null)} style={{ backgroundColor: '#8f5cff', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 24 }}><Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Close</Text></TouchableOpacity>
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