import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the stack param list for navigation
export type ProfileStackParamList = {
  UserProfile: undefined;
  UserProfileEdit: undefined;
};

const UserProfileScreen = () => {
  const { profile } = useUser();
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
  const [carMake, setCarMake] = useState(profile?.role === 'driver' ? profile.carMake : '');
  const [carModel, setCarModel] = useState(profile?.role === 'driver' ? profile.carModel : '');
  const [modList, setModList] = useState(profile?.role === 'driver' ? profile.modList : '');
  const [showBioInput, setShowBioInput] = useState(false);
  const [bioInput, setBioInput] = useState('');

  if (!profile) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 20 }}>No profile found.</Text>
      </View>
    );
  }

  const handleSave = () => {
    if (profile.role === 'driver') {
      // setProfile({
      //   ...profile,
      //   carMake,
      //   carModel,
      //   modList,
      //   bio,
      //   carPhoto: profilePic,
      // });
      Alert.alert('Profile Saved', 'Your profile has been updated.');
    } else if (profile.role === 'club') {
      // setProfile({
      //   ...profile,
      //   clubLogo: profilePic,
      // });
      Alert.alert('Profile Saved', 'Your profile has been updated.');
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission required', 'Permission to access camera roll is required!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      // This state is managed by UserProfileEditScreen, not this component.
      // setProfilePic(result.assets[0].uri);
    }
  };

  const handleBioSubmit = () => {
    // setBio(bioInput); // This line is removed as per the edit hint.
    setShowBioInput(false);
    setBioInput('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1, backgroundColor: '#000' }}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 32 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Profile Picture */}
          <View style={{ alignItems: 'center', marginBottom: 16, marginTop: 24 }}>
            <View style={{ borderRadius: 60, overflow: 'hidden', borderWidth: 2, borderColor: '#8f5cff', width: 120, height: 120, marginBottom: 20 }}>
              <Image
                source={profile.role === 'driver'
                  ? (profile.carPhoto ? { uri: profile.carPhoto } : require('../assets/icon.png'))
                  : (profile.role === 'club' && profile.clubLogo ? { uri: profile.clubLogo } : require('../assets/icon.png'))}
                style={{ width: 120, height: 120, resizeMode: 'cover' }}
              />
            </View>
            {/* Username absolutely centered, edit button to the right */}
            <View style={{ position: 'relative', width: '100%', marginBottom: 20, height: 32 }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 22,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  textAlignVertical: 'center',
                  zIndex: 1,
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {profile && profile.role === 'driver' ? profile.username : profile && profile.role === 'club' ? profile.clubName : '-'}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('UserProfileEdit')}
                style={{ position: 'absolute', right: '15%', top: 0, height: 32, justifyContent: 'center', zIndex: 2 }}
              >
                <Text style={{ color: '#8f5cff', fontSize: 15, fontWeight: '600' }}>Edit</Text>
              </TouchableOpacity>
            </View>
            {/* Followers/Following counts */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 0, marginBottom: 20 }}>
              <View style={{ alignItems: 'center', marginHorizontal: 16 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>123</Text>
                <Text style={{ color: '#aaa', fontSize: 13 }}>Followers</Text>
              </View>
              <View style={{ width: 1, height: 24, backgroundColor: '#333', marginHorizontal: 8 }} />
              <View style={{ alignItems: 'center', marginHorizontal: 16 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>456</Text>
                <Text style={{ color: '#aaa', fontSize: 13 }}>Following</Text>
              </View>
            </View>
            {/* Bio display only (no add/edit in view mode) */}
            {profile && profile.role === 'driver' && profile.bio ? (
              <Text style={{ color: '#fff', fontSize: 16, marginBottom: 8, textAlign: 'center', marginTop: 0 }}>{profile.bio}</Text>
            ) : null}
          </View>
          {/* Car Make */}
          <View style={{ marginBottom: 8 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 2, textAlign: 'left' }}>Car Make</Text>
            <Text style={{ backgroundColor: 'transparent', color: '#fff', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.3)', borderRadius: 0, paddingVertical: 10, paddingHorizontal: 0, fontSize: 16 }}>
              {profile && profile.role === 'driver' ? profile.carMake : ''}
            </Text>
          </View>
          {/* Car Model */}
          <View style={{ marginBottom: 8 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 2, textAlign: 'left' }}>Car Model</Text>
            <Text style={{ backgroundColor: 'transparent', color: '#fff', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.3)', borderRadius: 0, paddingVertical: 10, paddingHorizontal: 0, fontSize: 16 }}>
              {profile && profile.role === 'driver' ? profile.carModel : ''}
            </Text>
          </View>
          {/* Mods List */}
          <View style={{ marginBottom: 8 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 2, textAlign: 'left' }}>Mods List</Text>
            <Text style={{ backgroundColor: 'transparent', color: '#fff', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.3)', borderRadius: 0, paddingVertical: 10, paddingHorizontal: 0, fontSize: 16 }}>
              {profile && profile.role === 'driver' ? profile.modList : ''}
            </Text>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserProfileScreen; 