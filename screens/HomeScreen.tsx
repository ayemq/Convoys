import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import TileButton from '../components/TileButton';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define HomeStack param list
export type HomeStackParamList = {
  HomeMain: undefined;
  ExploreDriverMap: undefined;
  ConvoyDashboard: undefined;
  WhereToGoSelection: undefined;
};

const HomeScreen = () => {
  const { isDark, accent } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const accentColor = accent === 'orange' ? '#FF6B35' : 
                     accent === 'blue' ? '#4ECDC4' : 
                     accent === 'red' ? '#FF6B6B' : '#A8E6CF';

  const gradientColors = isDark 
    ? ['#1A1A2E', '#16213E', '#0F3460'] as const
    : ['#667eea', '#764ba2', '#f093fb'] as const;

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#0A0A0A' : '#F8F9FA' }]} showsVerticalScrollIndicator={false}>
      {/* Header with gradient background */}
      <LinearGradient colors={gradientColors} style={styles.headerGradient}>
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.subtitleText}>Ready to hit the road?</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <BlurView intensity={80} tint={isDark ? 'dark' : 'light'} style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Active Convoys</Text>
          </BlurView>
          <BlurView intensity={80} tint={isDark ? 'dark' : 'light'} style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Friends Online</Text>
          </BlurView>
          <BlurView intensity={80} tint={isDark ? 'dark' : 'light'} style={styles.statCard}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Events Today</Text>
          </BlurView>
        </View>

        {/* Main Actions */}
        <BlurView intensity={80} tint={isDark ? 'dark' : 'light'} style={styles.actionsCard}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.actionButtons}>
            <View style={styles.actionRow}>
              <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: accentColor }]}
                onPress={() => navigation.navigate('ExploreDriverMap')}
              >
                <Ionicons name="map" size={24} color="#fff" style={styles.actionIcon} />
                <Text style={styles.actionLabel}>Explore Map</Text>
                <Text style={styles.actionDescription}>Find routes and events</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: isDark ? '#2C3E50' : '#E8F4FD' }]}
                onPress={() => navigation.navigate('WhereToGoSelection')}
              >
                <Ionicons name="locate" size={24} color={isDark ? '#fff' : '#000'} style={styles.actionIcon} />
                <Text style={[styles.actionLabel, { color: isDark ? '#fff' : '#000' }]}>Where to Go</Text>
                <Text style={[styles.actionDescription, { color: isDark ? '#ccc' : '#666' }]}>Discover destinations</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={[styles.mainActionButton, { backgroundColor: accentColor }]}
              onPress={() => navigation.navigate('ConvoyDashboard')}
            >
              <Ionicons name="car-sport" size={32} color="#fff" style={styles.mainActionIcon} />
              <Text style={styles.mainActionLabel}>Convoys</Text>
              <Text style={styles.mainActionDescription}>Join or create convoys</Text>
            </TouchableOpacity>
          </View>
        </BlurView>

        {/* Recent Activity */}
        <BlurView intensity={80} tint={isDark ? 'dark' : 'light'} style={styles.activityCard}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons name="car-sport" size={20} color="#fff" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>New convoy created</Text>
              <Text style={styles.activitySubtitle}>Sunset Cruise - 2 hours ago</Text>
            </View>
            <View style={[styles.activityStatus, { backgroundColor: accentColor }]} />
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons name="people" size={20} color="#fff" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Friend request accepted</Text>
              <Text style={styles.activitySubtitle}>SpeedDemon joined - 4 hours ago</Text>
            </View>
            <View style={[styles.activityStatus, { backgroundColor: '#4ECDC4' }]} />
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons name="calendar" size={20} color="#fff" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Event reminder</Text>
              <Text style={styles.activitySubtitle}>Car Meet tomorrow at 2 PM</Text>
            </View>
            <View style={[styles.activityStatus, { backgroundColor: '#FF6B6B' }]} />
          </View>
        </BlurView>
      </View>
    </ScrollView>
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
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  content: {
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
  actionsCard: {
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
  actionButtons: {
    gap: 16,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  mainActionButton: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  mainActionIcon: {
    marginBottom: 12,
  },
  mainActionLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  mainActionDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  activityCard: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  activityStatus: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default HomeScreen; 