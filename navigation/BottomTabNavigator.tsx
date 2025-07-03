import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ExploreDriverMapScreen from '../screens/ExploreDriverMapScreen';
import ConvoyDashboardScreen from '../screens/ConvoyDashboardScreen';
import WhereToGoSelectionScreen from '../screens/WhereToGoSelectionScreen';
import { useTheme } from '../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="ExploreDriverMap" component={ExploreDriverMapScreen} />
      <HomeStack.Screen name="ConvoyDashboard" component={ConvoyDashboardScreen} />
      <HomeStack.Screen name="WhereToGoSelection" component={WhereToGoSelectionScreen} />
    </HomeStack.Navigator>
  );
}

const BottomTabNavigator = () => {
  const { isDark, accent } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#181C24' : '#fff',
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: accent === 'orange' ? '#FF9100' : accent === 'blue' ? '#2196F3' : accent === 'red' ? '#F44336' : '#9C27B0',
        tabBarInactiveTintColor: isDark ? '#888' : '#aaa',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-variant" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator; 