import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SecuritySettingsScreen = () => {
  const navigation = useNavigation();
  const [ghostMode, setGhostMode] = useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 52, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, padding: 8 }}>
        <Ionicons name="chevron-back" size={28} color="#fff" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ paddingTop: 90 }}>
        <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 24, marginLeft: 32 }}>Security</Text>
        <View style={{ backgroundColor: '#18181b', borderRadius: 18, marginHorizontal: 16, marginBottom: 24, paddingVertical: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 18 }}>
            <MaterialCommunityIcons name="ghost-outline" size={24} color="#8f5cff" style={{ marginRight: 16 }} />
            <Text style={{ color: '#fff', fontSize: 17, flex: 1 }}>Ghost Mode on Explore Map</Text>
            <Switch value={ghostMode} onValueChange={setGhostMode} thumbColor={ghostMode ? '#8f5cff' : '#fff'} trackColor={{ false: '#888', true: '#4B3B7A' }} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SecuritySettingsScreen; 