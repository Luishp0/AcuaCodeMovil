import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox'; // Asegúrate de instalar este paquete
import tw from 'twrnc';

// Importa las imágenes de los iconos
import AppleIcon from '../icons/AppleIcon.png';
import GoogleIcon from '../icons/GoogleIcon.png';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

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

        // Almacena el token y los datos del usuario
        await AsyncStorage.setItem('userToken', result.result.token);
        await AsyncStorage.setItem('userData', JSON.stringify(result.result));

        // Guarda el correo si está marcada la opción "Recordar"
        if (rememberMe) {
          await AsyncStorage.setItem('savedEmail', email);
        } else {
          await AsyncStorage.removeItem('savedEmail');
        }

        // Navega a la pantalla principal
        navigation.navigate('Home');
      } else {
        Alert.alert('Error en el inicio de sesión', result.message || 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      Alert.alert('Error de conexión:', error.message);
    }
  };

  return (
    <View style={tw`flex-1 justify-center px-4`}>
      <Text style={tw`text-2xl font-bold text-center mb-5`}>Inicio de Sesión</Text>

      <TextInput 
        placeholder="Correo Electrónico" 
        style={tw`border p-2 mb-4`} 
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput 
        placeholder="Contraseña" 
        style={tw`border p-2 mb-4`} 
        secureTextEntry 
        value={password}
        onChangeText={setPassword}
      />

      <View style={tw`flex-row items-center mb-4`}>
        <CheckBox value={rememberMe} onValueChange={setRememberMe} />
        <Text style={tw`ml-2`}>Recordar</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Recovery')} style={tw`ml-auto`}>
          <Text style={tw`text-blue-500`}>¿Olvidaste la contraseña?</Text>
        </TouchableOpacity>
      </View>

      <Button title="Ingresar" onPress={handleLogin} color="#1DA1F2" />

      <Text style={tw`text-center mt-4`}>
        ¿Aún no tienes cuenta?{' '}
        <Text onPress={() => navigation.navigate('Register')} style={tw`text-blue-500`}>Registrarse</Text>
      </Text>

      <View style={tw`flex-row justify-center mt-6`}>
        <Image source={AppleIcon} style={{ width: 32, height: 32 }} />
        <View style={tw`w-4`} />
        <Image source={GoogleIcon} style={{ width: 32, height: 32 }} />
      </View>

      <View style={tw`flex-row justify-center mt-6`}>
        <Text style={tw`text-xs text-blue-500 mr-4`}>Política de privacidad</Text>
        <Text style={tw`text-xs text-blue-500`}>Términos de uso</Text>
      </View>
    </View>
  );
};

export default LoginScreen;
