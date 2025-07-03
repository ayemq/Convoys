import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EventPinProps {
  verified?: boolean;
}

const EventPin: React.FC<EventPinProps> = ({ verified }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🚗☕️</Text>
      {verified && <Text style={styles.verified}>✔️</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  icon: {
    fontSize: 28,
  },
  verified: {
    position: 'absolute',
    top: -6,
    right: -10,
    fontSize: 16,
    color: '#FF9100',
  },
});

export default EventPin; 