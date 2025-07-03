import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PitStopRequest = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Pit Stop Request (placeholder)</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});

export default PitStopRequest; 