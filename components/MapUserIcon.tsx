import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

interface MapUserIconProps {
  imageUrl?: string;
  mood?: string;
}

const MapUserIcon: React.FC<MapUserIconProps> = ({ imageUrl, mood }) => {
  return (
    <View style={styles.container}>
      <Image
        source={imageUrl ? { uri: imageUrl } : require('../assets/icon.png')}
        style={styles.image}
      />
      <View style={styles.moodBubble}>
        <Text style={styles.moodText}>{mood || '😎'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#fff',
  },
  moodBubble: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#222',
    borderRadius: 12,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#fff',
    zIndex: 2,
  },
  moodText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default MapUserIcon; 