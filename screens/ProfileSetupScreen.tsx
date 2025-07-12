import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';

const ProfileSetupScreen = () => {
  const { isDark, accent } = useTheme();
  const { profile, setProfile } = useUser();
  const navigation = useNavigation();
  const [carMake, setCarMake] = useState(profile?.role === 'driver' ? profile.carMake : '');
  const [carModel, setCarModel] = useState(profile?.role === 'driver' ? profile.carModel : '');
  const [bio, setBio] = useState(profile?.role === 'driver' ? profile.bio : '');
  const [carPhoto, setCarPhoto] = useState(profile?.role === 'driver' ? profile.carPhoto || null : null);

  const accentColor = accent === 'orange' ? '#FF6B35' : 
                     accent === 'blue' ? '#4ECDC4' : 
                     accent === 'red' ? '#FF6B6B' : '#A8E6CF';

  const gradientColors = isDark 
    ? ['#1A1A2E', '#16213E', '#0F3460'] as const
    : ['#667eea', '#764ba2', '#f093fb'] as const;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setCarPhoto(result.assets[0].uri);
    }
  };

  const goToMain = () => {
    try {
      (navigation as any).navigate('Main');
    } catch {
      (navigation as any).reset({ index: 0, routes: [{ name: 'Main' }] });
    }
  };

  const handleSave = () => {
    if (profile?.role === 'driver') {
      if (!carMake || !carModel) {
        Alert.alert('Missing fields', 'Please fill out car make and model, or skip setup.');
        return;
      }
      setProfile({
        ...profile,
        carMake,
        carModel,
        carPhoto: carPhoto || undefined,
        bio,
        profileSetupComplete: true,
      });
    }
  };

  const handleSkip = () => {
    if (profile?.role === 'driver') {
      setProfile({
        ...profile,
        carMake: '',
        carModel: '',
        carPhoto: undefined,
        bio: '',
        profileSetupComplete: true,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={[styles.container, { backgroundColor: isDark ? '#0A0A0A' : '#F8F9FA' }]}>
          {/* Header with gradient background */}
          <LinearGradient colors={gradientColors} style={styles.headerGradient}>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>🚗 Profile Setup</Text>
              <Text style={styles.headerSubtitle}>Tell us about your ride</Text>
            </View>
          </LinearGradient>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Profile Photo Section */}
            <BlurView intensity={80} tint={isDark ? 'dark' : 'light'} style={styles.photoCard}>
              <Text style={styles.sectionTitle}>📸 Profile Photo</Text>
              <View style={styles.photoContainer}>
                <TouchableOpacity onPress={pickImage} style={styles.photoCircle}>
                  {carPhoto ? (
                    <Image source={{ uri: carPhoto }} style={styles.photoImage} />
                  ) : (
                    <View style={styles.photoPlaceholder}>
                      <Text style={styles.photoIcon}>🚗</Text>
                      <Text style={styles.photoText}>Add Photo</Text>
                    </View>
                  )}
                  <View style={[styles.editBadge, { backgroundColor: accentColor }]}>
                    <Text style={styles.editIcon}>✏️</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={pickImage} style={styles.editButton}>
                  <Text style={[styles.editText, { color: accentColor }]}>Change Photo</Text>
                </TouchableOpacity>
              </View>
            </BlurView>

            {/* Car Details Section */}
            <BlurView intensity={80} tint={isDark ? 'dark' : 'light'} style={styles.detailsCard}>
              <Text style={styles.sectionTitle}>🏎️ Car Details</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Car Make</Text>
                <TextInput 
                  style={styles.input} 
                  value={carMake} 
                  onChangeText={setCarMake} 
                  placeholder="e.g., Honda, Toyota, BMW" 
                  placeholderTextColor="rgba(255,255,255,0.5)" 
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Car Model</Text>
                <TextInput 
                  style={styles.input} 
                  value={carModel} 
                  onChangeText={setCarModel} 
                  placeholder="e.g., Civic, Camry, M3" 
                  placeholderTextColor="rgba(255,255,255,0.5)" 
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Bio</Text>
                <TextInput 
                  style={[styles.input, styles.bioInput]} 
                  value={bio} 
                  onChangeText={setBio} 
                  placeholder="Tell us about yourself and your car..." 
                  placeholderTextColor="rgba(255,255,255,0.5)" 
                  multiline 
                  numberOfLines={4}
                />
              </View>
            </BlurView>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={[styles.saveBtn, { backgroundColor: accentColor }]} 
                onPress={handleSave}
              > 
                <Text style={styles.saveText}>Save Profile</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.skipBtn} 
                onPress={handleSkip}
              >
                <Text style={[styles.skipText, { color: isDark ? '#999' : '#666' }]}>
                  Set up profile later
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  photoCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  detailsCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
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
  photoContainer: {
    alignItems: 'center',
  },
  photoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  photoImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  photoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  photoText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontWeight: '500',
  },
  editBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  editIcon: {
    fontSize: 16,
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  editText: {
    fontSize: 14,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  actionButtons: {
    gap: 12,
  },
  saveBtn: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  skipBtn: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  skipText: {
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ProfileSetupScreen; 