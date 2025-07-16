import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type HomeStackParamList = {
  HomeMain: undefined;
  ExploreDriverMap: undefined;
  ConvoyDashboard: undefined;
  WhereToGoSelection: undefined;
};

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#000' }} contentContainerStyle={{ padding: 32 }}>
      <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'left' }}>Home</Text>
      {/* Quick Stats */}
      <View style={{ flexDirection: 'row', marginBottom: 24 }}>
        <View style={{ flex: 1, marginRight: 8, backgroundColor: '#18181b', borderRadius: 16, padding: 16 }}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 4 }}>-</Text>
          <Text style={{ color: '#aaa', fontSize: 14 }}>Active Convoys</Text>
        </View>
        <View style={{ flex: 1, marginHorizontal: 4, backgroundColor: '#18181b', borderRadius: 16, padding: 16 }}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 4 }}>-</Text>
          <Text style={{ color: '#aaa', fontSize: 14 }}>Friends Online</Text>
        </View>
        <View style={{ flex: 1, marginLeft: 8, backgroundColor: '#18181b', borderRadius: 16, padding: 16 }}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 4 }}>-</Text>
          <Text style={{ color: '#aaa', fontSize: 14 }}>Events Today</Text>
        </View>
      </View>
      {/* Main Actions */}
      <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 12, textAlign: 'left' }}>Quick Actions</Text>
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <TouchableOpacity 
          style={{ flex: 1, backgroundColor: '#8f5cff', borderRadius: 16, padding: 20, alignItems: 'center', marginRight: 8 }}
          onPress={() => navigation.navigate('ExploreDriverMap')}
        >
          <Ionicons name="map" size={24} color="#fff" style={{ marginBottom: 8 }} />
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Explore Map</Text>
          <Text style={{ color: '#ccc', fontSize: 12, textAlign: 'center' }}>Find routes and events</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{ flex: 1, backgroundColor: '#18181b', borderRadius: 16, padding: 20, alignItems: 'center', marginLeft: 8 }}
          onPress={() => navigation.navigate('WhereToGoSelection')}
        >
          <Ionicons name="locate" size={24} color="#fff" style={{ marginBottom: 8 }} />
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Where to Go</Text>
          <Text style={{ color: '#ccc', fontSize: 12, textAlign: 'center' }}>Discover destinations</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={{ backgroundColor: '#8f5cff', borderRadius: 20, padding: 24, alignItems: 'center', marginBottom: 24 }}
        onPress={() => navigation.navigate('ConvoyDashboard')}
      >
        <Ionicons name="car-sport" size={32} color="#fff" style={{ marginBottom: 8 }} />
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Convoys</Text>
        <Text style={{ color: '#ccc', fontSize: 12, textAlign: 'center' }}>Join or create convoys</Text>
      </TouchableOpacity>
      {/* Recent Activity */}
      <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 12, textAlign: 'left' }}>Recent Activity</Text>
      <View style={{ backgroundColor: '#18181b', borderRadius: 16, padding: 20 }}>
        <Text style={{ color: '#aaa', fontSize: 16 }}>No activity yet. Connect to backend to see recent activity.</Text>
      </View>
    </ScrollView>
  );
};

export default HomeScreen; 