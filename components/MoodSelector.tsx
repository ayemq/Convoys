import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Mood } from '../context/UserContext';

const moods = [
  { label: 'Cruising', emoji: '😎' },
  { label: 'Racing', emoji: '😈' },
  { label: 'Photoshoot', emoji: '📸' },
  { label: 'Pit Stop', emoji: '🛠️' },
];

interface MoodSelectorProps {
  value?: Mood;
  onChange?: (mood: Mood) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      {moods.map((mood) => (
        <TouchableOpacity
          key={mood.label}
          style={[styles.button, value === mood.label && styles.selected]}
          onPress={() => onChange && onChange(mood.label as Mood)}
        >
          <Text style={styles.emoji}>{mood.emoji}</Text>
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
    padding: 10,
    marginHorizontal: 6,
    borderRadius: 16,
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: '#444',
  },
  selected: {
    backgroundColor: '#FF9100',
    borderColor: '#FF9100',
  },
  emoji: {
    fontSize: 24,
  },
});

export default MoodSelector; 