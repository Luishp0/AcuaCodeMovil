import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SettingsProvider, SettingsContext } from './assets/SettingsContext';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import UpdateUserScreen from './screens/UpdateUserScreen';
import CalendarScreen from './screens/CalendarScreen';
import SubstancesScreen from './screens/SubstancesScreen';
import SettingsScreen from './screens/SettingsScreen';
import RecoveryScreen from './screens/RecoveryScreen';
import VerificationScreen from './screens/VerificationScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import InicioScreen from './screens/InicioScreen';
import NotificationScreen from './screens/NotificacionScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { theme } = React.useContext(SettingsContext); // `useContext` dentro del proveedor

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Notification" >
        <Stack.Screen name="inicio" component={InicioScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="UpdateUser" component={UpdateUserScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Substances" component={SubstancesScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Recovery" component={RecoveryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Verification" component={VerificationScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Reset" component={ResetPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Notification" component={NotificationScreen} options={{headerShown: false}}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <SettingsProvider>
      <AppNavigator />
    </SettingsProvider>
  );
};

export default App;
