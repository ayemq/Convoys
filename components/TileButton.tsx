import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../context/ThemeContext';

interface TileButtonProps {
  label: string;
  position?: 'top' | 'center' | 'bottom';
  large?: boolean;
  onPress?: () => void;
}

const TileButton: React.FC<TileButtonProps> = ({ label, position, large, onPress }) => {
  const { accent, isDark } = useTheme();
  const accentColor =
    accent === 'orange' ? '#FF9100' : accent === 'blue' ? '#2196F3' : accent === 'red' ? '#F44336' : '#9C27B0';

  const borderRadius: ViewStyle['borderRadius'] =
    position === 'top' ? 32 : position === 'bottom' ? 32 : 24;
  const marginVertical = large ? 18 : 12;
  const height = large ? 120 : 90;

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={{ width: '90%', marginVertical }}>
      <BlurView intensity={70} tint={isDark ? 'dark' : 'light'} style={[styles.tile, { borderRadius, borderColor: accentColor, height }]}> 
        <Text style={[styles.label, { color: accentColor, fontSize: large ? 28 : 22 }]}>{label}</Text>
      </BlurView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: '100%',
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(24,28,36,0.55)',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    marginBottom: 0,
  },
  label: {
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
});

export default TileButton; 