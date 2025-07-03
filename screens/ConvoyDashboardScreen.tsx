import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../context/ThemeContext';
import ConvoyLeaderboard from '../components/ConvoyLeaderboard';
import PitStopRequest from '../components/PitStopRequest';

const mockMembers = [
  { id: '1', username: 'You', topSpeed: 80, miles: 12 },
  { id: '2', username: 'FastFury', topSpeed: 95, miles: 15 },
  { id: '3', username: 'PhotoQueen', topSpeed: 70, miles: 10 },
];

const ConvoyDashboardScreen = () => {
  const { isDark, accent } = useTheme();
  const accentColor =
    accent === 'orange' ? '#FF9100' : accent === 'blue' ? '#2196F3' : accent === 'red' ? '#F44336' : '#9C27B0';

  return (
    <ScrollView style={{ backgroundColor: isDark ? '#181C24' : '#f5f5f5' }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}> 
        <BlurView intensity={70} tint={isDark ? 'dark' : 'light'} style={styles.card}>
          <Text style={[styles.title, { color: accentColor }]}>Convoy Dashboard</Text>
          <Text style={styles.label}>Leader: You</Text>
          <Text style={styles.label}>Route: San Francisco → Santa Cruz</Text>
          <Text style={styles.label}>Members</Text>
          <View style={styles.membersRow}>
            {mockMembers.map(m => (
              <View key={m.id} style={styles.memberBubble}>
                <Text style={styles.memberText}>{m.username}</Text>
              </View>
            ))}
          </View>
          <PitStopRequest />
          <ConvoyLeaderboard />
          <TouchableOpacity style={[styles.leaveBtn, { borderColor: accentColor }]}> 
            <Text style={[styles.leaveText, { color: accentColor }]}>Leave Convoy</Text>
          </TouchableOpacity>
        </BlurView>
      </View>
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