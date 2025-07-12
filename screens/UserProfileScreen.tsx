import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useUser, Mood } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import MoodSelector from '../components/MoodSelector';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const UserProfileScreen = () => {
  const { profile, updateMood, sendFriendRequest, pendingRequests, acceptFriendRequest, friends } = useUser();
  const { isDark, accent } = useTheme();
  const navigation = useNavigation();

  if (!profile) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: isDark ? '#0A0A0A' : '#F8F9FA' }]}>
        <Text style={[styles.text, { color: isDark ? '#fff' : '#000' }]}>Loading profile...</Text>
      </View>
    );
  }

  const accentColor = accent === 'orange' ? '#FF6B35' : 
                     accent === 'blue' ? '#4ECDC4' : 
                     accent === 'red' ? '#FF6B6B' : '#A8E6CF';

  const gradientColors = isDark 
    ? ['#1A1A2E', '#16213E', '#0F3460'] as const
    : ['#667eea', '#764ba2', '#f093fb'] as const;

  const mockFriend = {
    id: 'friend1',
    username: 'SpeedDemon',
    role: 'driver' as const,
    carMake: 'BMW',
    carModel: 'M3',
    mood: 'excited' as Mood,
    isOnline: true,
  };

  const renderPendingItem = (req: any) => (
    <View key={req.id} style={styles.pendingItem}>
      <View style={styles.friendAvatar}>
        <Text style={styles.friendInitial}>{req.username.charAt(0)}</Text>
      </View>
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{req.username}</Text>
        <Text style={styles.friendMood}>Wants to be friends</Text>
      </View>
      <TouchableOpacity 
        style={[styles.acceptBtn, { backgroundColor: accentColor }]}
        onPress={() => acceptFriendRequest(req.id)}
      >
        <Text style={styles.acceptText}>Accept</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFriendItem = ({ item }: { item: any }) => (
    <View style={styles.friendItem}>
      <View style={styles.friendAvatar}>
        <Text style={styles.friendInitial}>{item.username.charAt(0)}</Text>
      </View>
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{item.username}</Text>
        <Text style={styles.friendMood}>{item.mood}</Text>
      </View>
      <View style={[styles.friendStatus, { backgroundColor: item.isOnline ? '#4CAF50' : '#999' }]} />
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#0A0A0A' : '#F8F9FA' }]} showsVerticalScrollIndicator={false}>
      {/* Header with gradient background */}
      <LinearGradient colors={gradientColors} style={styles.headerGradient}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.placeholderButton} />
        </View>
        <View style={styles.profileImageContainer}>
          <Image
            source={profile.role === 'driver' 
              ? (profile.carPhoto ? { uri: profile.carPhoto } : require('../assets/icon.png')) 
              : (profile.clubLogo ? { uri: profile.clubLogo } : require('../assets/icon.png'))}
            style={styles.profileImage}
          />
          <View style={[styles.onlineIndicator, { backgroundColor: accentColor }]} />
        </View>
        <Text style={styles.name}>{profile.role === 'driver' ? profile.username : profile.clubName}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>
            {profile.role === 'driver' ? 'Driver' : 'Club'}
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
            <Text style={styles.statNumber}>{friends.length}</Text>
            <Text style={[styles.statLabel, { color: isDark ? '#fff' : '#000' }]}>Friends</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
            <Text style={styles.statNumber}>{pendingRequests.length}</Text>
            <Text style={[styles.statLabel, { color: isDark ? '#fff' : '#000' }]}>Pending</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={[styles.statLabel, { color: isDark ? '#fff' : '#000' }]}>Convoys</Text>
          </View>
        </View>

        {/* Profile Info Card */}
        <BlurView intensity={80} tint={isDark ? 'dark' : 'light'} style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Profile Info</Text>
          {profile.role === 'driver' ? (
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Car</Text>
                <Text style={[styles.infoValue, { color: accentColor }]}>{profile.carMake} {profile.carModel}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Mods</Text>
                <Text style={[styles.infoValue, { color: isDark ? '#fff' : '#000' }]}>{profile.modList || 'None'}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>HP</Text>
                <Text style={[styles.infoValue, { color: isDark ? '#fff' : '#000' }]}>{profile.horsepower || 'N/A'}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Description</Text>
                <Text style={[styles.infoValue, { color: isDark ? '#fff' : '#000' }]}>{profile.clubDesc}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={[styles.infoValue, { color: isDark ? '#fff' : '#000' }]}>{profile.clubEmail}</Text>
              </View>
              {profile.verified && (
                <View style={styles.verifiedBadge}>
                  <Text style={[styles.verifiedText, { color: accentColor }]}>✓ Verified Club</Text>
                </View>
              )}
            </View>
          )}
        </BlurView>

        {/* Mood Selector */}
        <BlurView intensity={80} tint={isDark ? 'dark' : 'light'} style={styles.moodCard}>
          <Text style={styles.sectionTitle}>Current Mood</Text>
          <MoodSelector onChange={updateMood} value={profile.mood} />
        </BlurView>

        {/* Add Friend Button */}
        <TouchableOpacity 
          style={[styles.addFriendBtn, { backgroundColor: accentColor }]} 
          onPress={() => sendFriendRequest(mockFriend)}
        >
          <Text style={styles.addFriendText}>+ Add Friend</Text>
        </TouchableOpacity>
        
        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <BlurView intensity={80} tint={isDark ? 'dark' : 'light'} style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Pending Requests</Text>
            {pendingRequests.map(req => renderPendingItem(req))}
          </BlurView>
        )}

        {/* Friends List */}
        <BlurView intensity={80} tint={isDark ? 'dark' : 'light'} style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Friends</Text>
          {friends.length > 0 ? (
            <FlatList
              data={friends}
              keyExtractor={item => item.id}
              renderItem={renderFriendItem}
              scrollEnabled={false}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyText, { color: isDark ? '#666' : '#999' }]}>No friends yet</Text>
              <Text style={[styles.emptySubtext, { color: isDark ? '#444' : '#777' }]}>Start adding friends to see them here</Text>
            </View>
          )}
        </BlurView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '100%',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholderButton: {
    width: 40,
    height: 40,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  roleBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  roleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
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
  },
  infoCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  moodCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  sectionCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
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
  infoGrid: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  verifiedBadge: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  verifiedText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  addFriendBtn: {
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  addFriendText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  friendAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4ECDC4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  friendInitial: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  friendMood: {
    color: '#999',
    fontSize: 12,
  },
  friendStatus: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  acceptBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  acceptText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default UserProfileScreen; 