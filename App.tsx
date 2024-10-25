import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SettingsProvider } from './assets/SettingsContext.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import UpdateUserScreen from './screens/UpdateUserScreen.jsx';
import CalendarScreen from './screens/CalendarScreen.jsx';
import SubstancesScreen from './screens/SubstancesScreem.jsx';
import SettingsScreen from './screens/SettingsScreen.jsx';


const Stack = createStackNavigator();

const App = () => {
  return (
    <SettingsProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name='UpdateUser' component={UpdateUserScreen}/>
        <Stack.Screen name='Calendar' component={CalendarScreen}/>
        <Stack.Screen name='Substances' component={SubstancesScreen}/>
        <Stack.Screen name='Settings' component={SettingsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    </SettingsProvider>
  );
};

export default App;
