import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const options = [
  { label: 'Public', value: 'public' },
  { label: 'Friends Only', value: 'friends' },
  { label: 'Ghost Mode', value: 'ghost' },
];

interface VisibilityToggleProps {
  value?: 'public' | 'friends' | 'ghost';
  onChange?: (value: 'public' | 'friends' | 'ghost') => void;
}

const VisibilityToggle: React.FC<VisibilityToggleProps> = ({ value = 'public', onChange }) => {
  return (
    <View style={styles.container}>
      {options.map((opt) => (
        <TouchableOpacity
          key={opt.value}
          style={[styles.button, value === opt.value && styles.selected]}
          onPress={() => onChange && onChange(opt.value as any)}
        >
          <Text style={styles.text}>{opt.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 12,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 16,
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: '#444',
  },
  selected: {
    backgroundColor: '#FF9100',
    borderColor: '#FF9100',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default VisibilityToggle; 