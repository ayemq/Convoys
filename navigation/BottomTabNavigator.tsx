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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0,
          height: 40 + insets.bottom,
          paddingBottom: 18 + insets.bottom,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#8f5cff', // Always purple for selected icon
        tabBarInactiveTintColor: '#888',
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: 14,
          marginBottom: 4,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
      })}
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