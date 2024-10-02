import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import tw from 'twrnc';  // Importa la librería twrnc

const LoginScreen = ({ navigation }) => {
  return (
    <View style={tw`flex-1 justify-center px-4`}>
      <Text style={tw`text-2xl font-bold text-center mb-5`}>Login</Text>
      <TextInput 
        placeholder="Email" 
        style={tw`border p-2 mb-4`} 
      />
      <TextInput 
        placeholder="Password" 
        style={tw`border p-2 mb-4`} 
        secureTextEntry 
      />
      <View style={tw`mb-4`}>
        <Button title="Login" onPress={() => alert('Logged In!')} />
      </View>
      <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default LoginScreen;
