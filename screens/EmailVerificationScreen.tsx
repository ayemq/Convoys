import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Linking, Alert, ActivityIndicator } from 'react-native';
import { getAuth, sendEmailVerification, reload } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

const EmailVerificationScreen = () => {
  const navigation = useNavigation();
  const [sending, setSending] = useState(false);
  const [checking, setChecking] = useState(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    // Start polling for verification
    const id = setInterval(async () => {
      setChecking(true);
      await reload(user);
      if (user.emailVerified) {
        clearInterval(id);
        setIntervalId(null);
        // No manual navigation to 'Main' needed; root navigator will switch automatically.
      }
      setChecking(false);
    }, 10000);
    setIntervalId(id);
    return () => { if (id) clearInterval(id); };
  }, [user]);

  const handleResend = async () => {
    if (!user) return;
    setSending(true);
    try {
      await sendEmailVerification(user);
      Alert.alert('Verification Email Sent', 'Please check your inbox.');
    } catch (e) {
      Alert.alert('Error', 'Could not resend verification email.');
    }
    setSending(false);
  };

  const handleOpenEmail = () => {
    Linking.openURL('mailto:');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', padding: 32 }}>
      <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>
        Verify your email
      </Text>
      <Text style={{ color: '#ccc', fontSize: 16, marginBottom: 32, textAlign: 'center' }}>
        We’ve sent a verification email to your address. Please verify your email to continue.
      </Text>
      <TouchableOpacity
        style={{ backgroundColor: '#8f5cff', borderRadius: 30, paddingVertical: 16, paddingHorizontal: 40, marginBottom: 18, width: '100%', alignItems: 'center' }}
        onPress={handleResend}
        disabled={sending}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>{sending ? 'Resending...' : 'Resend Email'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: '#18181b', borderRadius: 30, paddingVertical: 16, paddingHorizontal: 40, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: '#8f5cff' }}
        onPress={handleOpenEmail}
      >
        <Text style={{ color: '#8f5cff', fontWeight: 'bold', fontSize: 18 }}>Open Email App</Text>
      </TouchableOpacity>
      {checking && <ActivityIndicator color="#8f5cff" style={{ marginTop: 24 }} />}
      <Text style={{ color: '#888', fontSize: 13, marginTop: 24, textAlign: 'center' }}>
        Waiting for verification... (Check your inbox and spam folder)
      </Text>
    </View>
  );
};

export default EmailVerificationScreen; 