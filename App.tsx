import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SettingsProvider } from './assets/SettingsContext';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import UpdateUserScreen from './screens/UpdateUserScreen';
import CalendarScreen from './screens/CalendarScreen';
import SubstancesScreen from './screens/SubstancesScreen';
import SettingsScreen from './screens/SettingsScreen';
import RecoveryScreen from './screens/RecoveryScreen';
import VerificationScreen from './screens/VerificationScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="UpdateUser" component={UpdateUserScreen} />
          <Stack.Screen name="Calendar" component={CalendarScreen} />
          <Stack.Screen name="Substances" component={SubstancesScreen} />

          <Stack.Screen name='Recovery' component={RecoveryScreen}/>
          <Stack.Screen name='Verification' component={VerificationScreen}/>

          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen} 
            options={{
              title: 'Configuración', // Título del navbar
              headerStyle: { backgroundColor: '#1F2937' }, // Color de fondo
              headerTintColor: '#fff', // Color del texto
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SettingsProvider>
  );
};

export default App;
