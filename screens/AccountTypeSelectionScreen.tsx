import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AccountTypeSelectionScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', padding: 32 }}>
      <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 32, textAlign: 'left', width: '100%' }}>
        Create your Convoy account
      </Text>
      <TouchableOpacity
        style={{ backgroundColor: '#8f5cff', borderRadius: 30, paddingVertical: 14, paddingHorizontal: 40, marginBottom: 24, width: '100%', alignItems: 'flex-start' }}
        onPress={() => navigation.navigate('DriverSignUp' as never)}
      >
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center', width: '100%' }}>Sign up as a Driver</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: '#18181b', borderRadius: 30, paddingVertical: 14, paddingHorizontal: 40, width: '100%', alignItems: 'flex-start', borderWidth: 1, borderColor: '#8f5cff' }}
        onPress={() => navigation.navigate('ClubSignUp' as never)}
      >
        <Text style={{ color: '#8f5cff', fontSize: 20, fontWeight: 'bold', textAlign: 'center', width: '100%' }}>Sign up as a Club</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountTypeSelectionScreen; 