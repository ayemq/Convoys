import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useUser } from '../context/UserContext';

const UserProfileScreen = () => {
  const { profile, setProfile } = useUser();
  const [carMake, setCarMake] = useState(profile?.role === 'driver' ? profile.carMake : '');
  const [carModel, setCarModel] = useState(profile?.role === 'driver' ? profile.carModel : '');
  const [modList, setModList] = useState(profile?.role === 'driver' ? profile.modList : '');
  const [horsepower, setHorsepower] = useState(profile?.role === 'driver' ? profile.horsepower : '');
  const [bio, setBio] = useState(profile?.role === 'driver' ? profile.bio : '');

  if (!profile) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 20 }}>No profile found.</Text>
      </View>
    );
  }

  const handleSave = () => {
    if (profile.role === 'driver') {
      setProfile({
        ...profile,
        carMake,
        carModel,
        modList,
        horsepower,
        bio,
      });
      Alert.alert('Profile Saved', 'Your profile has been updated.');
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#000' }} contentContainerStyle={{ padding: 32 }}>
      <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'left' }}>Profile</Text>
      <View style={{ backgroundColor: '#18181b', borderRadius: 20, padding: 24, marginBottom: 24 }}>
        {/* Profile fields go here, styled as cards/rows */}
        {/* Example: */}
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, marginBottom: 8, textAlign: 'left' }}>Username</Text>
        <Text style={{ color: '#aaa', fontSize: 16, marginBottom: 16, textAlign: 'left' }}>{profile && profile.role === 'driver' ? profile.username : profile && profile.role === 'club' ? profile.clubName : '-'}</Text>
        {/* Add more fields as needed, using the same card/row style */}
      </View>
      {/* Add edit buttons, etc., as needed */}
    </ScrollView>
  );
};

export default UserProfileScreen; 