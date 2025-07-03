import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
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
};

const SignupScreen = () => {
  const { isDark, accent } = useTheme();
  const { setProfile } = useUser();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [role, setRole] = useState<UserRole>('driver');
  // Driver fields
  const [username, setUsername] = useState('');
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carPhoto, setCarPhoto] = useState<string | null>(null);
  const [modList, setModList] = useState('');
  const [horsepower, setHorsepower] = useState('');
  // Club fields
  const [clubName, setClubName] = useState('');
  const [clubDesc, setClubDesc] = useState('');
  const [clubLogo, setClubLogo] = useState<string | null>(null);
  const [clubEmail, setClubEmail] = useState('');
  const [clubLinks, setClubLinks] = useState('');

  const accentColor =
    accent === 'orange' ? '#FF9100' : accent === 'blue' ? '#2196F3' : accent === 'red' ? '#F44336' : '#9C27B0';

  const pickImage = async (setImage: (uri: string) => void) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (role === 'driver') {
      if (!username || !carMake || !carModel) {
        Alert.alert('Missing fields', 'Please fill out all required fields.');
        return;
      }
      setProfile({
        role: 'driver',
        username,
        carMake,
        carModel,
        carPhoto: carPhoto || undefined,
        modList,
        horsepower,
        mood: 'Cruising' as Mood,
      });
    } else {
      if (!clubName || !clubDesc || !clubEmail) {
        Alert.alert('Missing fields', 'Please fill out all required fields.');
        return;
      }
      setProfile({
        role: 'club',
        clubName,
        clubDesc,
        clubLogo: clubLogo || undefined,
        clubEmail,
        clubLinks,
        verified: false,
        mood: 'Cruising' as Mood,
      });
    }
    navigation.navigate('Profile');
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: isDark ? '#181C24' : '#fff' }}>
      <View style={styles.container}>
        <View style={styles.toggleRow}>
          <TouchableOpacity onPress={() => setRole('driver')} style={[styles.toggleBtn, role === 'driver' && { backgroundColor: accentColor }]}> 
            <Text style={styles.toggleText}>Driver</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setRole('club')} style={[styles.toggleBtn, role === 'club' && { backgroundColor: accentColor }]}> 
            <Text style={styles.toggleText}>Club</Text>
          </TouchableOpacity>
        </View>
        <BlurView intensity={70} tint={isDark ? 'dark' : 'light'} style={styles.formCard}>
          {role === 'driver' ? (
            <>
              <Text style={[styles.label, { color: accentColor }]}>Username</Text>
              <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Username" placeholderTextColor="#888" />
              <Text style={[styles.label, { color: accentColor }]}>Car Make</Text>
              <TextInput style={styles.input} value={carMake} onChangeText={setCarMake} placeholder="Car Make" placeholderTextColor="#888" />
              <Text style={[styles.label, { color: accentColor }]}>Car Model</Text>
              <TextInput style={styles.input} value={carModel} onChangeText={setCarModel} placeholder="Car Model" placeholderTextColor="#888" />
              <Text style={[styles.label, { color: accentColor }]}>Car Photo</Text>
              <TouchableOpacity style={styles.imagePicker} onPress={() => pickImage(uri => setCarPhoto(uri))}>
                {carPhoto ? <Image source={{ uri: carPhoto }} style={styles.image} /> : <Text style={styles.imageText}>Pick Photo</Text>}
              </TouchableOpacity>
              <Text style={[styles.label, { color: accentColor }]}>Mod List</Text>
              <TextInput style={styles.input} value={modList} onChangeText={setModList} placeholder="Mods (comma separated)" placeholderTextColor="#888" />
              <Text style={[styles.label, { color: accentColor }]}>Estimated Horsepower</Text>
              <TextInput style={styles.input} value={horsepower} onChangeText={setHorsepower} placeholder="e.g. 400" placeholderTextColor="#888" keyboardType="numeric" />
            </>
          ) : (
            <>
              <Text style={[styles.label, { color: accentColor }]}>Club Name</Text>
              <TextInput style={styles.input} value={clubName} onChangeText={setClubName} placeholder="Club Name" placeholderTextColor="#888" />
              <Text style={[styles.label, { color: accentColor }]}>Description</Text>
              <TextInput style={styles.input} value={clubDesc} onChangeText={setClubDesc} placeholder="Description" placeholderTextColor="#888" multiline />
              <Text style={[styles.label, { color: accentColor }]}>Club Logo</Text>
              <TouchableOpacity style={styles.imagePicker} onPress={() => pickImage(uri => setClubLogo(uri))}>
                {clubLogo ? <Image source={{ uri: clubLogo }} style={styles.image} /> : <Text style={styles.imageText}>Pick Logo</Text>}
              </TouchableOpacity>
              <Text style={[styles.label, { color: accentColor }]}>Contact Email</Text>
              <TextInput style={styles.input} value={clubEmail} onChangeText={setClubEmail} placeholder="Email" placeholderTextColor="#888" keyboardType="email-address" />
              <Text style={[styles.label, { color: accentColor }]}>Social/Website Links</Text>
              <TextInput style={styles.input} value={clubLinks} onChangeText={setClubLinks} placeholder="Links (comma separated)" placeholderTextColor="#888" />
            </>
          )}
          <TouchableOpacity style={[styles.submitBtn, { backgroundColor: accentColor }]} onPress={handleSubmit}> 
            <Text style={styles.submitText}>Sign Up</Text>
          </TouchableOpacity>
        </BlurView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  toggleRow: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: 'rgba(24,28,36,0.55)',
    borderRadius: 20,
    overflow: 'hidden',
  },
  toggleBtn: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    marginHorizontal: 2,
  },
  toggleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  formCard: {
    width: 340,
    padding: 24,
    borderRadius: 28,
    backgroundColor: 'rgba(24,28,36,0.55)',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    marginBottom: 32,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    fontSize: 16,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    fontSize: 16,
  },
  imagePicker: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    marginBottom: 8,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },
  imageText: {
    color: '#888',
    fontSize: 16,
  },
  submitBtn: {
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1.2,
  },
});

export default SignupScreen; 