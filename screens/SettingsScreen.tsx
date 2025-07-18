import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';

// Define the stack param list for navigation
export type SettingsStackParamList = {
  Settings: undefined;
  AccountSettings: undefined;
  SecuritySettings: undefined;
  Login: undefined;
};

const SettingsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();
  const { isDark, toggleTheme } = useTheme();
  const [showShare, setShowShare] = React.useState(false);
  const shareLink = 'https://convoys.app/user/yourusername'; // Placeholder

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* Back button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 70, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, padding: 8 }}>
        <Ionicons name="chevron-back" size={28} color="#fff" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ padding: 0, paddingTop: 140, paddingHorizontal: 0 }}>
        {/* Settings Header */}
        <Text style={{ color: '#fff', fontSize: 32, fontWeight: 'bold', marginBottom: 24, marginLeft: 30, textAlign: 'left' }}>Settings</Text>
        {/* Account Section */}
        <Text style={{ color: '#aaa', fontSize: 14, fontWeight: '600', marginLeft: 30, marginBottom: 8, letterSpacing: 1 }}>ACCOUNT</Text>
        <View style={{ backgroundColor: '#18181b', borderRadius: 18, marginHorizontal: 16, marginBottom: 24, paddingVertical: 4 }}>
          {/* Account Tile */}
          <TouchableOpacity onPress={() => navigation.navigate('AccountSettings')} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 18, borderBottomWidth: 1, borderBottomColor: '#232326' }}>
            <Ionicons name="person-circle-outline" size={24} color="#8f5cff" style={{ marginRight: 16 }} />
            <Text style={{ color: '#fff', fontSize: 17, flex: 1 }}>Account</Text>
            <Ionicons name="chevron-forward" size={22} color="#888" />
          </TouchableOpacity>
          {/* Security Tile */}
          <TouchableOpacity onPress={() => navigation.navigate('SecuritySettings')} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 18 }}>
            <Ionicons name="lock-closed-outline" size={24} color="#8f5cff" style={{ marginRight: 16 }} />
            <Text style={{ color: '#fff', fontSize: 17, flex: 1 }}>Security</Text>
            <Ionicons name="chevron-forward" size={22} color="#888" />
          </TouchableOpacity>
        </View>
        {/* Share Profile */}
        <TouchableOpacity onPress={() => setShowShare(!showShare)} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#18181b', borderRadius: 18, marginHorizontal: 16, marginBottom: 24, paddingVertical: 18, paddingHorizontal: 18 }}>
          <Ionicons name="share-social-outline" size={24} color="#8f5cff" style={{ marginRight: 16 }} />
          <Text style={{ color: '#fff', fontSize: 17, flex: 1 }}>Share Profile</Text>
          <Ionicons name={showShare ? 'chevron-up' : 'chevron-forward'} size={22} color="#888" />
        </TouchableOpacity>
        {showShare && (
          <View style={{ backgroundColor: '#232326', borderRadius: 12, marginHorizontal: 32, marginBottom: 24, padding: 14 }}>
            <Text style={{ color: '#fff', fontSize: 15, textAlign: 'center' }}>{shareLink}</Text>
          </View>
        )}
        {/* Display Section */}
        <Text style={{ color: '#aaa', fontSize: 14, fontWeight: '600', marginLeft: 30, marginBottom: 8, letterSpacing: 1 }}>DISPLAY</Text>
        <View style={{ backgroundColor: '#18181b', borderRadius: 18, marginHorizontal: 16, marginBottom: 24, paddingVertical: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 18 }}>
            <Ionicons name={isDark ? 'moon' : 'sunny'} size={24} color="#8f5cff" style={{ marginRight: 16 }} />
            <Text style={{ color: '#fff', fontSize: 17, flex: 1 }}>Dark Mode</Text>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              thumbColor={isDark ? '#8f5cff' : '#fff'}
              trackColor={{ false: '#888', true: '#4B3B7A' }}
            />
          </View>
        </View>
        {/* Login/Logout Section */}
        <Text style={{ color: '#aaa', fontSize: 14, fontWeight: '600', marginLeft: 30, marginBottom: 8, letterSpacing: 1 }}>LOGIN</Text>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#18181b', borderRadius: 18, marginHorizontal: 16, marginBottom: 40, paddingVertical: 18, paddingHorizontal: 18 }}
          onPress={() => navigation.navigate('Login')}
        >
          <MaterialCommunityIcons name="logout" size={24} color="#8f5cff" style={{ marginRight: 16 }} />
          <Text style={{ color: '#fff', fontSize: 17, flex: 1 }}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen; 