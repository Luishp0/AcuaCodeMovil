import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import tw from 'twrnc';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8000/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: email,
          contrasena: password,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Inicio de sesión exitoso');
        // Redirecciona al usuario a la pantalla principal
        navigation.navigate('Home'); // Ajusta el nombre de la pantalla de destino
      } else {
        Alert.alert('Error en el inicio de sesión', result.message || 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      Alert.alert('Error de conexión:', error.message);
    }
  };

  return (
    <View style={tw`flex-1 justify-center px-4`}>
      <Text style={tw`text-2xl font-bold text-center mb-5`}>Login</Text>
      <TextInput 
        placeholder="Email" 
        style={tw`border p-2 mb-4`} 
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput 
        placeholder="Password" 
        style={tw`border p-2 mb-4`} 
        secureTextEntry 
        value={password}
        onChangeText={setPassword}
      />
      <View style={tw`mb-4`}>
        <Button title="Login" onPress={handleLogin} />
      </View>
      <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default LoginScreen;
