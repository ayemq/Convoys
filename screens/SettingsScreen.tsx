import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const { isDark, accent, toggleTheme, setAccent } = useTheme();
  const navigation = useNavigation();

  const accentColor = accent === 'orange' ? '#FF6B35' : 
                     accent === 'blue' ? '#4ECDC4' : 
                     accent === 'red' ? '#FF6B6B' : '#A8E6CF';

  const gradientColors = isDark 
    ? ['#1A1A2E', '#16213E', '#0F3460'] as const
    : ['#667eea', '#764ba2', '#f093fb'] as const;

  const settingsSections = [
    {
      title: 'Appearance',
      items: [
        {
          icon: 'moon',
          title: 'Dark Mode',
          subtitle: 'Toggle dark theme',
          type: 'switch',
          value: isDark,
          onPress: toggleTheme,
        },
        {
          icon: 'color-palette',
          title: 'Accent Color',
          subtitle: `Current: ${accent}`,
          type: 'select',
          onPress: () => {
            const colors = ['orange', 'blue', 'red', 'green'];
            const currentIndex = colors.indexOf(accent);
            const nextIndex = (currentIndex + 1) % colors.length;
            setAccent(colors[nextIndex] as any);
          },
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          icon: 'person',
          title: 'Profile',
          subtitle: 'Edit your profile',
          type: 'navigate',
          onPress: () => navigation.navigate('UserProfile' as never),
        },
        {
          icon: 'notifications',
          title: 'Notifications',
          subtitle: 'Manage notifications',
          type: 'navigate',
          onPress: () => {},
        },
        {
          icon: 'shield-checkmark',
          title: 'Privacy',
          subtitle: 'Privacy settings',
          type: 'navigate',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'App',
      items: [
        {
          icon: 'help-circle',
          title: 'Help & Support',
          subtitle: 'Get help and contact support',
          type: 'navigate',
          onPress: () => {},
        },
        {
          icon: 'information-circle',
          title: 'About',
          subtitle: 'App version and info',
          type: 'navigate',
          onPress: () => {},
        },
        {
          icon: 'share-social',
          title: 'Share App',
          subtitle: 'Share with friends',
          type: 'navigate',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Data',
      items: [
        {
          icon: 'download',
          title: 'Export Data',
          subtitle: 'Download your data',
          type: 'navigate',
          onPress: () => {},
        },
        {
          icon: 'trash',
          title: 'Delete Account',
          subtitle: 'Permanently delete account',
          type: 'navigate',
          onPress: () => {},
          destructive: true,
        },
      ],
    },
  ];

  const renderSettingItem = (item: any) => (
    <TouchableOpacity 
      key={item.title}
      style={styles.settingItem}
      onPress={item.onPress}
      disabled={item.type === 'switch'}
    >
      <View style={styles.settingIcon}>
        <Ionicons 
          name={item.icon as any} 
          size={20} 
          color={item.destructive ? '#FF6B6B' : accentColor} 
        />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, item.destructive && styles.destructiveText]}>
          {item.title}
        </Text>
        <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
      </View>
      {item.type === 'switch' ? (
        <Switch
          value={item.value}
          onValueChange={item.onPress}
          trackColor={{ false: '#767577', true: accentColor }}
          thumbColor={item.value ? '#fff' : '#f4f3f4'}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.5)" />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#000' }} contentContainerStyle={{ padding: 32 }}>
      <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'left' }}>Settings</Text>
      <View style={{ backgroundColor: '#18181b', borderRadius: 20, padding: 24, marginBottom: 24 }}>
        {/* Example setting */}
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, marginBottom: 12, textAlign: 'left' }}>Account</Text>
        <TouchableOpacity style={{ backgroundColor: '#8f5cff', borderRadius: 12, padding: 16, marginBottom: 12 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#18181b', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#8f5cff' }}>
          <Text style={{ color: '#8f5cff', fontWeight: 'bold', fontSize: 16 }}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      {/* Add more settings sections/cards as needed */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  destructiveText: {
    color: '#FF6B6B',
  },
  logoutBtn: {
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
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
});

export default SettingsScreen; 