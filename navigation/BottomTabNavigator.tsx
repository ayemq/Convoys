import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ExploreDriverMapScreen from '../screens/ExploreDriverMapScreen';
import ConvoyDashboardScreen from '../screens/ConvoyDashboardScreen';
import WhereToGoSelectionScreen from '../screens/WhereToGoSelectionScreen';
import UserProfileEditScreen from '../screens/UserProfileEditScreen';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';
import SecuritySettingsScreen from '../screens/SecuritySettingsScreen';
import LoginScreen from '../screens/LoginScreen';
import { useTheme } from '../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

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

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="UserProfile" component={UserProfileScreen} />
      <ProfileStack.Screen name="UserProfileEdit" component={UserProfileEditScreen} />
    </ProfileStack.Navigator>
  );
}

function SettingsStackNavigator() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="AccountSettings" component={AccountSettingsScreen} />
      <SettingsStack.Screen name="SecuritySettings" component={SecuritySettingsScreen} />
      <SettingsStack.Screen name="Login" component={LoginScreen} />
    </SettingsStack.Navigator>
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
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackNavigator}
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