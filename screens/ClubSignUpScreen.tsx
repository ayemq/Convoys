import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useForm, Controller } from 'react-hook-form';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { useUser } from '../context/UserContext';

const ClubSignUpScreen = () => {
  const navigation = useNavigation();
  const { setProfile } = useUser();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [clubLogo, setClubLogo] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setClubLogo(result.assets[0].uri);
    }
  };

  const onSubmit = async (data: any) => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setProfile({
        role: 'club',
        clubName: data.clubName,
        clubDesc: data.clubDesc || '',
        clubLogo: clubLogo || undefined,
        clubEmail: data.email,
        clubLinks: '',
        verified: false,
        mood: 'Cruising',
      });
      Alert.alert('Signed up (dev mode)', 'You have signed up as a club.');
    }, 500);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', padding: 32 }}>
        <View style={{ width: '100%', maxWidth: 400 }}>
          <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'left' }}>Sign up as a Club</Text>
          <Controller
            control={control}
            name="clubName"
            rules={{ required: 'Club name is required' }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={{ color: '#fff', fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#333', marginBottom: 18, paddingVertical: 12, textAlign: 'left' }}
                placeholder="Club Name"
                placeholderTextColor="#aaa"
                value={value}
                onChangeText={onChange}
                autoCapitalize="words"
                blurOnSubmit={true}
                returnKeyType="next"
              />
            )}
          />
          {typeof errors.clubName?.message === 'string' && <Text style={{ color: '#FF6B6B', marginBottom: 8, textAlign: 'left' }}>{errors.clubName.message}</Text>}
          <Controller
            control={control}
            name="email"
            rules={{ required: 'Email is required' }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={{ color: '#fff', fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#333', marginBottom: 18, paddingVertical: 12, textAlign: 'left' }}
                placeholder="Email"
                placeholderTextColor="#aaa"
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
                keyboardType="email-address"
                blurOnSubmit={true}
                returnKeyType="next"
              />
            )}
          />
          {typeof errors.email?.message === 'string' && <Text style={{ color: '#FF6B6B', marginBottom: 8, textAlign: 'left' }}>{errors.email.message}</Text>}
          <Controller
            control={control}
            name="password"
            rules={{ required: 'Password is required' }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={{ color: '#fff', fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#333', marginBottom: 18, paddingVertical: 12, textAlign: 'left' }}
                placeholder="Password"
                placeholderTextColor="#aaa"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                blurOnSubmit={true}
                returnKeyType="next"
              />
            )}
          />
          {typeof errors.password?.message === 'string' && <Text style={{ color: '#FF6B6B', marginBottom: 8, textAlign: 'left' }}>{errors.password.message}</Text>}
          <Controller
            control={control}
            name="clubDesc"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={{ color: '#fff', fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#333', marginBottom: 18, paddingVertical: 12, textAlign: 'left' }}
                placeholder="Club Description"
                placeholderTextColor="#aaa"
                value={value}
                onChangeText={onChange}
                multiline
                blurOnSubmit={true}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
              />
            )}
          />
          {typeof errors.clubDesc?.message === 'string' && <Text style={{ color: '#FF6B6B', marginBottom: 8, textAlign: 'left' }}>{errors.clubDesc.message}</Text>}
          <TouchableOpacity
            style={{ backgroundColor: '#8f5cff', borderRadius: 30, marginTop: 18, paddingVertical: 16, alignItems: 'center', width: '100%' }}
            onPress={handleSubmit(onSubmit)}
            disabled={uploading}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>{uploading ? 'Submitting...' : 'Sign Up'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ClubSignUpScreen; 