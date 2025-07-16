import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider, useUser } from './context/UserContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ProfileSetupScreen from './screens/ProfileSetupScreen';
import AccountTypeSelectionScreen from './screens/AccountTypeSelectionScreen';
import DriverSignUpScreen from './screens/DriverSignUpScreen';
import ClubSignUpScreen from './screens/ClubSignUpScreen';
import EmailVerificationScreen from './screens/EmailVerificationScreen';
import { View, Text } from 'react-native';

const RootStack = createNativeStackNavigator();

function RootNavigator() {
  const { profile } = useUser();
  // If not logged in, show login/signup flow
  if (!profile) {
    return (
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="Signup" component={AccountTypeSelectionScreen} />
        <RootStack.Screen name="AccountTypeSelection" component={AccountTypeSelectionScreen} />
        <RootStack.Screen name="DriverSignUp" component={DriverSignUpScreen} />
        <RootStack.Screen name="ClubSignUp" component={ClubSignUpScreen} />
        <RootStack.Screen name="EmailVerification" component={EmailVerificationScreen} />
      </RootStack.Navigator>
    );
  }
  // If logged in, show main app
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Main" component={BottomTabNavigator} />
      <RootStack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
    </RootStack.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
