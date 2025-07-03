import React from 'react';
import { View, StyleSheet } from 'react-native';
import TileButton from '../components/TileButton';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define HomeStack param list
export type HomeStackParamList = {
  HomeMain: undefined;
  ExploreDriverMap: undefined;
  ConvoyDashboard: undefined;
  WhereToGoSelection: undefined;
};

const HomeScreen = () => {
  const { isDark } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#181C24' : '#f5f5f5' }]}> 
      <TileButton label="Explore Map" position="top" onPress={() => navigation.navigate('ExploreDriverMap')} />
      <TileButton label="Convoys" position="center" large onPress={() => navigation.navigate('ConvoyDashboard')} />
      <TileButton label="Where to Go" position="bottom" onPress={() => navigation.navigate('WhereToGoSelection')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
});

export default HomeScreen; 