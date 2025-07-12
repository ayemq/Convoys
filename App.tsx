import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider, useUser } from './context/UserContext';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import SignupScreen from './screens/SignupScreen';
import ProfileSetupScreen from './screens/ProfileSetupScreen';

const RootStack = createNativeStackNavigator();

function RootNavigator() {
  const { profile } = useUser();
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {profile == null ? (
        <RootStack.Screen name="Signup" component={SignupScreen} />
      ) : profile.role === 'driver' && !profile.profileSetupComplete ? (
        <RootStack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
      ) : (
        <RootStack.Screen name="Main" component={BottomTabNavigator} />
      )}
    </RootStack.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </UserProvider>
    </ThemeProvider>
  );
}
