import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../context/ThemeContext';

const ConvoyCreateScreen = () => {
  const { isDark, accent } = useTheme();
  const [destination, setDestination] = useState('');
  const [quickJoin, setQuickJoin] = useState(false);
  const [invited, setInvited] = useState<string[]>([]);
  // Mock friends
  const friends = [
    { id: '1', username: 'FastFury' },
    { id: '2', username: 'PhotoQueen' },
  ];
  const accentColor =
    accent === 'orange' ? '#FF9100' : accent === 'blue' ? '#2196F3' : accent === 'red' ? '#F44336' : '#9C27B0';

  const toggleInvite = (id: string) => {
    setInvited((prev) => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#181C24' : '#f5f5f5' }]}> 
      <BlurView intensity={70} tint={isDark ? 'dark' : 'light'} style={styles.card}>
        <Text style={[styles.title, { color: accentColor }]}>Start a Convoy</Text>
        <Text style={styles.label}>Destination</Text>
        <TextInput
          style={styles.input}
          value={destination}
          onChangeText={setDestination}
          placeholder="Enter destination or route"
          placeholderTextColor="#888"
        />
        <View style={styles.row}>
          <Text style={styles.label}>Quick Join</Text>
          <Switch value={quickJoin} onValueChange={setQuickJoin} trackColor={{ true: accentColor, false: '#888' }} />
        </View>
        <Text style={styles.label}>Invite Friends</Text>
        <View style={styles.friendsRow}>
          {friends.map(friend => (
            <TouchableOpacity
              key={friend.id}
              style={[styles.friendBtn, invited.includes(friend.id) && { backgroundColor: accentColor }]}
              onPress={() => toggleInvite(friend.id)}
            >
              <Text style={styles.friendText}>{friend.username}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={[styles.createBtn, { backgroundColor: accentColor }]}> 
          <Text style={styles.createText}>Create Convoy</Text>
        </TouchableOpacity>
      </BlurView>
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