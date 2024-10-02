import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import tw from 'twrnc';

const RegisterScreen = ({ navigation }) => {
  return (
    <View style={tw`flex-1 justify-center px-4`}>
      <Text style={tw`text-2xl font-bold text-center mb-5`}>Register</Text>
      <TextInput 
        placeholder="Email" 
        style={tw`border p-2 mb-4`} 
      />
      <TextInput 
        placeholder="Password" 
        style={tw`border p-2 mb-4`} 
        secureTextEntry 
      />
      <TextInput 
        placeholder="Confirm Password" 
        style={tw`border p-2 mb-4`} 
        secureTextEntry 
      />
      <View style={tw`mb-4`}>
        <Button title="Register" onPress={() => alert('Registered!')} />
      </View>
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default RegisterScreen;
