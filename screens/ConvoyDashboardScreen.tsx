import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../context/ThemeContext';
import ConvoyLeaderboard from '../components/ConvoyLeaderboard';
import PitStopRequest from '../components/PitStopRequest';

// TODO: Replace with backend convoy members fetch
const members: any[] = []; // Placeholder for convoy members from backend

const ConvoyDashboardScreen = () => {
  const { isDark, accent } = useTheme();
  const accentColor =
    accent === 'orange' ? '#FF9100' : accent === 'blue' ? '#2196F3' : accent === 'red' ? '#F44336' : '#9C27B0';

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#000' }} contentContainerStyle={{ padding: 32 }}>
      <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'left' }}>Convoy Dashboard</Text>
      <View style={{ backgroundColor: '#18181b', borderRadius: 20, padding: 24, marginBottom: 24 }}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 8, textAlign: 'left' }}>Leader: You</Text>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 8, textAlign: 'left' }}>Route: San Francisco → Santa Cruz</Text>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 8, textAlign: 'left' }}>Members</Text>
        <View style={{ flexDirection: 'row', marginBottom: 18 }}>
          {members.length === 0 ? (
            <Text style={{ color: '#aaa', fontSize: 16 }}>No members yet. Connect to backend to see convoy members.</Text>
          ) : (
            members.map(m => (
              <View key={m.id} style={{ backgroundColor: '#222', borderRadius: 16, paddingVertical: 10, paddingHorizontal: 18, marginHorizontal: 6, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>{m.username}</Text>
              </View>
            ))
          )}
        </View>
        <TouchableOpacity style={{ borderColor: '#8f5cff', borderWidth: 2, borderRadius: 16, alignItems: 'center', width: '100%', paddingVertical: 12, marginTop: 18 }}> 
          <Text style={{ color: '#8f5cff', fontWeight: 'bold', fontSize: 18, letterSpacing: 1.2 }}>Leave Convoy</Text>
        </TouchableOpacity>
      </View>
      <PitStopRequest />
      <ConvoyLeaderboard />
    </ScrollView>
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
  membersRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  memberBubble: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  leaveBtn: {
    marginTop: 18,
    borderWidth: 2,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
  },
  leaveText: {
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1.2,
  },
});

export default ConvoyDashboardScreen; 