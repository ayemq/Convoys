import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../context/ThemeContext';
import { useUser, UserRole, Mood } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the stack param list for navigation
export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  ProfileSetup: undefined;
};

const SignupScreen = () => {
  const { isDark, accent } = useTheme();
  const { setProfile } = useUser();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  const accentColor = accent === 'orange' ? '#FF6B35' : 
                     accent === 'blue' ? '#4ECDC4' : 
                     accent === 'red' ? '#FF6B6B' : '#A8E6CF';

  const gradientColors = isDark 
    ? ['#1A1A2E', '#16213E', '#0F3460'] as const
    : ['#667eea', '#764ba2', '#f093fb'] as const;

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Missing fields', 'Please enter your username and password.');
      return;
    }
    // Mock login: set a minimal profile and go to home
    setProfile({
      role: 'driver',
      username,
      carMake: 'Honda',
      carModel: 'Civic',
      carPhoto: undefined,
      modList: '',
      horsepower: '',
      mood: 'Cruising',
      bio: '',
      profileSetupComplete: true,
    });
  };

  const handleSignup = () => {
    if (!username || !password || !email) {
      Alert.alert('Missing fields', 'Please fill out all fields.');
      return;
    }
    // Mock signup: set a minimal profile and go to profile setup
    setProfile({
      role: 'driver',
      username,
      carMake: '',
      carModel: '',
      carPhoto: undefined,
      modList: '',
      horsepower: '',
      mood: 'Cruising',
      bio: '',
      profileSetupComplete: false,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container, { backgroundColor: isDark ? '#0A0A0A' : '#F8F9FA' }]}>
        {/* Header with gradient background */}
        <LinearGradient colors={gradientColors} style={styles.headerGradient}>
          <View style={styles.headerContent}>
            <Text style={styles.appTitle}>🚗 Convoys</Text>
            <Text style={styles.appSubtitle}>Connect with fellow drivers</Text>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Mode Toggle */}
          <BlurView intensity={80} tint={isDark ? 'dark' : 'light'} style={styles.toggleCard}>
            <View style={styles.toggleRow}>
              <TouchableOpacity 
                onPress={() => setMode('login')} 
                style={[
                  styles.toggleBtn, 
                  mode === 'login' && { backgroundColor: accentColor }
                ]}
              > 
                <Text style={[styles.toggleText, mode === 'login' && styles.toggleTextActive]}>
                  Log in
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setMode('signup')} 
                style={[
                  styles.toggleBtn, 
                  mode === 'signup' && { backgroundColor: accentColor }
                ]}
              > 
                <Text style={[styles.toggleText, mode === 'signup' && styles.toggleTextActive]}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </BlurView>

          {/* Form Card */}
          <BlurView intensity={80} tint={isDark ? 'dark' : 'light'} style={styles.formCard}>
            {mode === 'login' ? (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Username</Text>
                  <TextInput 
                    style={styles.input} 
                    value={username} 
                    onChangeText={setUsername} 
                    placeholder="Enter your username" 
                    placeholderTextColor="rgba(255,255,255,0.5)" 
                  />
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <TextInput 
                    style={styles.input} 
                    value={password} 
                    onChangeText={setPassword} 
                    placeholder="Enter your password" 
                    placeholderTextColor="rgba(255,255,255,0.5)" 
                    secureTextEntry 
                  />
                </View>
                
                <TouchableOpacity 
                  style={styles.forgotPassword} 
                  onPress={() => Alert.alert('Forgot password', 'Password reset flow not implemented.')}
                > 
                  <Text style={[styles.forgotPasswordText, { color: accentColor }]}>
                    Forgot password?
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.submitBtn, { backgroundColor: accentColor }]} 
                  onPress={handleLogin}
                > 
                  <Text style={styles.submitText}>Log in</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Username</Text>
                  <TextInput 
                    style={styles.input} 
                    value={username} 
                    onChangeText={setUsername} 
                    placeholder="Choose a username" 
                    placeholderTextColor="rgba(255,255,255,0.5)" 
                  />
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <TextInput 
                    style={styles.input} 
                    value={email} 
                    onChangeText={setEmail} 
                    placeholder="Enter your email" 
                    placeholderTextColor="rgba(255,255,255,0.5)" 
                    keyboardType="email-address" 
                  />
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <TextInput 
                    style={styles.input} 
                    value={password} 
                    onChangeText={setPassword} 
                    placeholder="Create a password" 
                    placeholderTextColor="rgba(255,255,255,0.5)" 
                    secureTextEntry 
                  />
                </View>
                
                <TouchableOpacity 
                  style={[styles.submitBtn, { backgroundColor: accentColor }]} 
                  onPress={handleSignup}
                > 
                  <Text style={styles.submitText}>Create Account</Text>
                </TouchableOpacity>
              </>
            )}
          </BlurView>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: isDark ? '#666' : '#999' }]}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  toggleCard: {
    borderRadius: 20,
    padding: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    overflow: 'hidden',
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderRadius: 16,
  },
  toggleText: {
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
    fontSize: 16,
  },
  toggleTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  formCard: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  submitBtn: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default SignupScreen; 