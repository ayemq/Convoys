import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }
    // TODO: Replace with backend login API call
    Alert.alert('Not implemented', 'Login will be available once backend is connected.');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', paddingHorizontal: 32 }}>
      {/* Heading */}
      <View style={{ marginBottom: 32 }}>
        <Text style={{ color: '#fff', fontSize: 32, fontWeight: 'bold', textAlign: 'left' }}>
          Login to <Text style={{ color: '#8f5cff' }}>Convoys</Text>
        </Text>
        <Text style={{ color: '#ccc', fontSize: 16, marginTop: 4, textAlign: 'left' }}>Start a Convoy and a new adventure!</Text>
      </View>
      {/* Email and Password Fields */}
      <View style={{ gap: 18 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent', borderBottomWidth: 1, borderBottomColor: '#333', marginBottom: 8 }}>
          <Ionicons name="mail-outline" size={22} color="#fff" style={{ marginRight: 10 }} />
          <TextInput
            style={{ flex: 1, color: '#fff', fontSize: 18, paddingVertical: 12, backgroundColor: 'transparent' }}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email"
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent', borderBottomWidth: 1, borderBottomColor: '#333', marginBottom: 8 }}>
          <Ionicons name="lock-closed-outline" size={22} color="#fff" style={{ marginRight: 10 }} />
          <TextInput
            style={{ flex: 1, color: '#fff', fontSize: 18, paddingVertical: 12, backgroundColor: 'transparent' }}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter Password"
            placeholderTextColor="#aaa"
            secureTextEntry
          />
        </View>
      </View>
      {/* Forgot Password */}
      <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 6 }} onPress={() => Alert.alert('Forgot password', 'Password reset flow not implemented.')}> 
        <Text style={{ color: '#888', fontSize: 13 }}>Forgot Password?</Text>
      </TouchableOpacity>
      {/* Login Button */}
      <TouchableOpacity
        style={{ backgroundColor: '#8f5cff', borderRadius: 30, marginTop: 28, paddingVertical: 16, alignItems: 'center', width: '100%' }}
        onPress={handleLogin}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Login</Text>
      </TouchableOpacity>
      {/* Sign Up Link */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24 }}>
        <Text style={{ color: '#888', fontSize: 13 }}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup' as never)}>
          <Text style={{ color: '#ccc', fontSize: 13, fontWeight: 'bold' }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      {/* TODO: Add navigation to splash/landing screen here in the future */}
    </View>
  );
};

export default LoginScreen; 