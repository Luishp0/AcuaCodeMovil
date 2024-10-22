import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import UpdateUserScreen from './screens/UpdateUserScreen.jsx';
import CalendarScreen from './screens/CalendarScreen.jsx';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name='UpdateUser' component={UpdateUserScreen}/>
        <Stack.Screen name='Calendar' component={CalendarScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
