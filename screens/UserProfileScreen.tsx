import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useUser, Mood } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import MoodSelector from '../components/MoodSelector';

const UserProfileScreen = () => {
  const { profile, updateMood, sendFriendRequest, pendingRequests, acceptFriendRequest, friends } = useUser();
  const { isDark, accent } = useTheme();
  if (!profile) {
    return (
      <View style={styles.centered}><Text style={styles.text}>No profile found. Please sign up.</Text></View>
    );
  }
  const accentColor =
    accent === 'orange' ? '#FF9100' : accent === 'blue' ? '#2196F3' : accent === 'red' ? '#F44336' : '#9C27B0';
  // Mock friend to add
  const mockFriend = { id: 'f4', username: 'NewFriend', mood: 'Cruising' as Mood };
  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#181C24' : '#f5f5f5' }]}> 
      <View style={styles.profileCard}>
        <Image
          source={profile.role === 'driver' ? (profile.carPhoto ? { uri: profile.carPhoto } : require('../assets/icon.png')) : (profile.clubLogo ? { uri: profile.clubLogo } : require('../assets/icon.png'))}
          style={styles.profileImage}
        />
        <Text style={[styles.name, { color: accentColor }]}>{profile.role === 'driver' ? profile.username : profile.clubName}</Text>
        <Text style={styles.role}>{profile.role === 'driver' ? 'Driver' : 'Club'}</Text>
        {profile.role === 'driver' ? (
          <>
            <Text style={styles.info}>{profile.carMake} {profile.carModel}</Text>
            <Text style={styles.info}>Mods: {profile.modList || 'None'}</Text>
            <Text style={styles.info}>HP: {profile.horsepower || 'N/A'}</Text>
          </>
        ) : (
          <>
            <Text style={styles.info}>{profile.clubDesc}</Text>
            <Text style={styles.info}>Email: {profile.clubEmail}</Text>
            <Text style={styles.info}>Links: {profile.clubLinks || 'None'}</Text>
            {profile.verified && <Text style={[styles.verified, { color: accentColor }]}>Verified Club</Text>}
          </>
        )}
        <View style={{ marginVertical: 12 }}>
          <MoodSelector onChange={updateMood} value={profile.mood} />
        </View>
        <TouchableOpacity style={[styles.friendBtn, { borderColor: accentColor }]} onPress={() => sendFriendRequest(mockFriend)}> 
          <Text style={[styles.friendBtnText, { color: accentColor }]}>Add Friend</Text>
        </TouchableOpacity>
        {pendingRequests.length > 0 && (
          <View style={styles.pendingBox}>
            <Text style={styles.pendingTitle}>Pending Requests</Text>
            {pendingRequests.map(req => (
              <View key={req.id} style={styles.pendingRow}>
                <Text style={styles.pendingText}>{req.username}</Text>
                <TouchableOpacity onPress={() => acceptFriendRequest(req.id)} style={styles.acceptBtn}><Text style={styles.acceptText}>Accept</Text></TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        <View style={styles.friendsBox}>
          <Text style={styles.friendsTitle}>Friends</Text>
          <FlatList
            data={friends}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Text style={styles.friendName}>{item.username}</Text>}
            ListEmptyComponent={<Text style={styles.friendName}>No friends yet.</Text>}
          />
        </View>
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
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    width: 340,
    padding: 24,
    borderRadius: 28,
    backgroundColor: 'rgba(24,28,36,0.55)',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    alignItems: 'center',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 2,
  },
  role: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 8,
  },
  info: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 2,
    textAlign: 'center',
  },
  verified: {
    fontWeight: 'bold',
    marginTop: 6,
    fontSize: 16,
  },
  friendBtn: {
    marginTop: 16,
    borderWidth: 2,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  friendBtnText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
  pendingBox: {
    marginTop: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  pendingTitle: {
    color: '#FF9100',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  pendingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  pendingText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 12,
  },
  acceptBtn: {
    backgroundColor: '#FF9100',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  acceptText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  friendsBox: {
    marginTop: 18,
    width: '100%',
    alignItems: 'center',
  },
  friendsTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  friendName: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 2,
  },
});

export default UserProfileScreen; 