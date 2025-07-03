import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import BottomTabNavigator from './navigation/BottomTabNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </UserProvider>
    </ThemeProvider>
  );
}
