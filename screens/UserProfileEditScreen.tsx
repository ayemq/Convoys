import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const UserProfileEditScreen = () => {
  const { profile, setProfile } = useUser();
  const navigation = useNavigation();
  const [carMake, setCarMake] = useState(profile?.role === 'driver' ? profile.carMake : '');
  const [carModel, setCarModel] = useState(profile?.role === 'driver' ? profile.carModel : '');
  const [modList, setModList] = useState(profile?.role === 'driver' ? profile.modList : '');
  const [bio, setBio] = useState(profile?.role === 'driver' ? profile.bio : '');
  const [profilePic, setProfilePic] = useState(
    profile?.role === 'driver'
      ? profile.carPhoto
      : profile?.role === 'club'
      ? profile.clubLogo
      : undefined
  );
  const [showBioInput, setShowBioInput] = useState(false);
  const [bioInput, setBioInput] = useState(bio || '');

  if (!profile) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 20 }}>No profile found.</Text>
      </View>
    );
  }

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    if (profile.role === 'driver') {
      setProfile({
        ...profile,
        carMake,
        carModel,
        modList,
        bio,
        carPhoto: profilePic,
      });
      Alert.alert('Profile Saved', 'Your profile has been updated.');
    } else if (profile.role === 'club') {
      setProfile({
        ...profile,
        clubLogo: profilePic,
      });
      Alert.alert('Profile Saved', 'Your profile has been updated.');
    }
    navigation.goBack();
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
      setProfilePic(result.assets[0].uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        {/* Back button */}
        <TouchableOpacity onPress={handleBack} style={{ position: 'absolute', top: 70, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, padding: 8 }}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <ScrollView
          style={{ flex: 1, backgroundColor: '#000' }}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 32 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Profile Picture */}
          <View style={{ alignItems: 'center', marginBottom: 16, marginTop: 24 }}>
            <TouchableOpacity onPress={pickImage} style={{ borderRadius: 60, overflow: 'hidden', borderWidth: 2, borderColor: '#8f5cff', width: 120, height: 120, marginBottom: 10 }}>
              <Image
                source={profilePic ? { uri: profilePic } : require('../assets/icon.png')}
                style={{ width: 120, height: 120, resizeMode: 'cover' }}
              />
            </TouchableOpacity>
            {/* Edit Photo button in edit mode */}
            <TouchableOpacity onPress={pickImage} style={{ marginTop: 6, marginBottom: 0 }}>
              <Text style={{ color: '#8f5cff', fontSize: 14 }}>Edit Photo</Text>
            </TouchableOpacity>
            {/* Username centered under profile picture */}
            <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold', marginTop: 8, textAlign: 'center' }}>
              {profile && profile.role === 'driver' ? profile.username : profile && profile.role === 'club' ? profile.clubName : '-'}
            </Text>
            {/* Followers/Following counts */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 6, marginBottom: 10 }}>
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
            {/* Add bio button and bio input/display in edit mode */}
            {showBioInput ? (
              <View style={{ width: '100%', marginBottom: 8 }}>
                <TextInput
                  style={{ backgroundColor: 'transparent', color: '#fff', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.3)', borderRadius: 0, paddingVertical: 10, paddingHorizontal: 0, fontSize: 16, marginBottom: 4, textAlign: 'center' }}
                  value={bioInput}
                  onChangeText={setBioInput}
                  placeholder="Add a bio..."
                  placeholderTextColor="#888"
                  returnKeyType="done"
                  blurOnSubmit={true}
                  onSubmitEditing={() => { setBio(bioInput); setShowBioInput(false); }}
                  autoFocus
                />
                <TouchableOpacity onPress={() => { setBio(bioInput); setShowBioInput(false); }} style={{ alignSelf: 'center', backgroundColor: '#8f5cff', borderRadius: 30, paddingVertical: 8, paddingHorizontal: 28, marginTop: 6 }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>Save</Text>
                </TouchableOpacity>
              </View>
            ) : bio ? (
              <View style={{ alignItems: 'center', marginBottom: 8 }}>
                <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center', marginTop: 0 }}>{bio}</Text>
                <TouchableOpacity onPress={() => { setBioInput(bio); setShowBioInput(true); }} style={{ marginTop: 4, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 8, paddingVertical: 4, paddingHorizontal: 16 }}>
                  <Text style={{ color: '#8f5cff', fontSize: 13, fontWeight: '600' }}>Edit bio</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={() => setShowBioInput(true)} style={{ marginTop: 0, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 8, paddingVertical: 4, paddingHorizontal: 16 }}>
                <Text style={{ color: '#8f5cff', fontSize: 13, fontWeight: '600' }}>Add bio</Text>
              </TouchableOpacity>
            )}
          </View>
          {/* Profile Heading */}
          <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'left', marginTop: 12 }}>Edit Profile</Text>
          {/* Car Make */}
          <View style={{ marginBottom: 8 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 2, textAlign: 'left' }}>Car Make</Text>
            <TextInput
              style={{ backgroundColor: 'transparent', color: '#fff', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.3)', borderRadius: 0, paddingVertical: 10, paddingHorizontal: 0, fontSize: 16 }}
              value={carMake}
              onChangeText={setCarMake}
              placeholder="e.g. BMW"
              placeholderTextColor="#888"
              returnKeyType="done"
              blurOnSubmit={true}
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
          {/* Car Model */}
          <View style={{ marginBottom: 8 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 2, textAlign: 'left' }}>Car Model</Text>
            <TextInput
              style={{ backgroundColor: 'transparent', color: '#fff', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.3)', borderRadius: 0, paddingVertical: 10, paddingHorizontal: 0, fontSize: 16 }}
              value={carModel}
              onChangeText={setCarModel}
              placeholder="e.g. M3"
              placeholderTextColor="#888"
              returnKeyType="done"
              blurOnSubmit={true}
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
          {/* Mods List */}
          <View style={{ marginBottom: 8 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 2, textAlign: 'left' }}>Mods List</Text>
            <TextInput
              style={{ backgroundColor: 'transparent', color: '#fff', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.3)', borderRadius: 0, paddingVertical: 10, paddingHorizontal: 0, fontSize: 16 }}
              value={modList}
              onChangeText={setModList}
              placeholder="List your car mods"
              placeholderTextColor="#888"
              returnKeyType="done"
              blurOnSubmit={true}
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
          {/* Save Button */}
          <TouchableOpacity onPress={handleSave} style={{ backgroundColor: '#8f5cff', borderRadius: 30, paddingVertical: 16, paddingHorizontal: 32, alignItems: 'center', marginTop: 8 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserProfileEditScreen; 