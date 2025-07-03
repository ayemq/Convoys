import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { BlurView } from 'expo-blur';

const accentOptions = [
  { label: 'Orange', value: 'orange', color: '#FF9100' },
  { label: 'Blue', value: 'blue', color: '#2196F3' },
  { label: 'Red', value: 'red', color: '#F44336' },
  { label: 'Purple', value: 'purple', color: '#9C27B0' },
];

const SettingsScreen = () => {
  const { isDark, toggleTheme, accent, setAccent } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#181C24' : '#f5f5f5' }]}> 
      <BlurView intensity={70} tint={isDark ? 'dark' : 'light'} style={styles.card}>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.section}>
          <Text style={styles.label}>Theme</Text>
          <TouchableOpacity style={styles.toggleBtn} onPress={toggleTheme}>
            <Text style={styles.toggleText}>{isDark ? 'Dark Mode' : 'Light Mode'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Accent Color</Text>
          <View style={styles.accentRow}>
            {accentOptions.map(opt => (
              <TouchableOpacity
                key={opt.value}
                style={[styles.accentBtn, { backgroundColor: opt.color, borderWidth: accent === opt.value ? 3 : 1, borderColor: accent === opt.value ? '#fff' : '#888' }]}
                onPress={() => setAccent(opt.value as any)}
              >
                <Text style={styles.accentLabel}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  card: {
    width: 340,
    padding: 28,
    borderRadius: 28,
    backgroundColor: 'rgba(24,28,36,0.55)',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 18,
  },
  section: {
    marginBottom: 24,
    width: '100%',
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  toggleBtn: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 4,
  },
  toggleText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  accentRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  accentBtn: {
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accentLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SettingsScreen; 