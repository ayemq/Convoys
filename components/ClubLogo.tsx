import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface ClubLogoProps {
  imageUrl?: string;
}

const ClubLogo: React.FC<ClubLogoProps> = ({ imageUrl }) => {
  return (
    <View style={styles.container}>
      <Image
        source={imageUrl ? { uri: imageUrl } : require('../assets/icon.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default ClubLogo; 