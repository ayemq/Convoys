import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../context/ThemeContext';

const ConvoyCreateScreen = () => {
  const { isDark, accent } = useTheme();
  const [destination, setDestination] = useState('');
  const [quickJoin, setQuickJoin] = useState(false);
  const [invited, setInvited] = useState<string[]>([]);
  // TODO: Replace with backend friends fetch
  const friends: any[] = []; // Placeholder for friends from backend
  const accentColor =
    accent === 'orange' ? '#FF9100' : accent === 'blue' ? '#2196F3' : accent === 'red' ? '#F44336' : '#9C27B0';

  const toggleInvite = (id: string) => {
    setInvited((prev) => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', padding: 32 }}>
      <View style={{ width: '100%', maxWidth: 400, backgroundColor: '#18181b', borderRadius: 20, padding: 28 }}>
        <Text style={{ color: '#8f5cff', fontWeight: 'bold', fontSize: 24, marginBottom: 18, textAlign: 'left' }}>Start a Convoy</Text>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 8, textAlign: 'left' }}>Destination</Text>
        <TextInput
          style={{ backgroundColor: '#222', color: '#fff', borderRadius: 12, padding: 10, marginBottom: 12, fontSize: 16, width: '100%', textAlign: 'left' }}
          value={destination}
          onChangeText={setDestination}
          placeholder="Enter destination or route"
          placeholderTextColor="#888"
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 12 }}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'left' }}>Quick Join</Text>
          <Switch value={quickJoin} onValueChange={setQuickJoin} trackColor={{ true: accentColor, false: '#888' }} />
        </View>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 8, textAlign: 'left' }}>Invite Friends</Text>
        <View style={{ flexDirection: 'row', marginBottom: 18 }}>
          {friends.length === 0 ? (
            <Text style={{ color: '#aaa', fontSize: 16 }}>No friends to invite. Connect to backend to see friends.</Text>
          ) : (
            friends.map(friend => (
              <TouchableOpacity
                key={friend.id}
                style={[{ backgroundColor: '#222', borderRadius: 16, paddingVertical: 10, paddingHorizontal: 18, marginHorizontal: 6, alignItems: 'center', justifyContent: 'center' }, invited.includes(friend.id) && { backgroundColor: accentColor }]}
                onPress={() => toggleInvite(friend.id)}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>{friend.username}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
        <TouchableOpacity style={{ backgroundColor: '#8f5cff', borderRadius: 16, alignItems: 'center', width: '100%', paddingVertical: 14, marginTop: 18 }}> 
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, letterSpacing: 1.2 }}>Create Convoy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 18,
  },
  label: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  friendsRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  friendBtn: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  createBtn: {
    marginTop: 18,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
  },
  createText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1.2,
  },
});

export default ConvoyCreateScreen; 