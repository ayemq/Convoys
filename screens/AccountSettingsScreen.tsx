import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AccountSettingsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 52, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, padding: 8 }}>
        <Ionicons name="chevron-back" size={28} color="#fff" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ paddingTop: 90 }}>
        <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 24, marginLeft: 32 }}>Account Settings</Text>
        <View style={{ backgroundColor: '#18181b', borderRadius: 18, marginHorizontal: 16, marginBottom: 24, paddingVertical: 4 }}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 18, borderBottomWidth: 1, borderBottomColor: '#232326' }}>
            <Ionicons name="person-outline" size={24} color="#8f5cff" style={{ marginRight: 16 }} />
            <Text style={{ color: '#fff', fontSize: 17, flex: 1 }}>Account Information</Text>
            <Ionicons name="chevron-forward" size={22} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 18, borderBottomWidth: 1, borderBottomColor: '#232326' }}>
            <Ionicons name="lock-closed-outline" size={24} color="#8f5cff" style={{ marginRight: 16 }} />
            <Text style={{ color: '#fff', fontSize: 17, flex: 1 }}>Change Password</Text>
            <Ionicons name="chevron-forward" size={22} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 18, borderBottomWidth: 1, borderBottomColor: '#232326' }}>
            <MaterialCommunityIcons name="account-off-outline" size={24} color="#8f5cff" style={{ marginRight: 16 }} />
            <Text style={{ color: '#fff', fontSize: 17, flex: 1 }}>Deactivate Account</Text>
            <Ionicons name="chevron-forward" size={22} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 18 }}>
            <Ionicons name="trash-outline" size={24} color="#FF6B6B" style={{ marginRight: 16 }} />
            <Text style={{ color: '#FF6B6B', fontSize: 17, flex: 1 }}>Delete Account</Text>
            <Ionicons name="chevron-forward" size={22} color="#888" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountSettingsScreen; 