import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import { SettingsContext } from '../assets/SettingsContext';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

import Logo from '../icons/logotra.png'; // Ruta del logo
import AppleIcon from '../icons/AppleIcon.png'; // Ícono personalizado
import GoogleIcon from '../icons/GoogleIcon.png'; // Ícono personalizado

const apiUrl = Config.API_URL;

const LoginScreen = ({ navigation }) => {
  const { theme } = useContext(SettingsContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiUrl}usuario/login`, {
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

        await AsyncStorage.setItem('userToken', result.result.token);
        await AsyncStorage.setItem('userData', JSON.stringify(result.result));

        if (rememberMe) {
          await AsyncStorage.setItem('savedEmail', email);
        } else {
          await AsyncStorage.removeItem('savedEmail');
        }

        navigation.navigate('Home');
      } else {
        Alert.alert('Error en el inicio de sesión', result.message || 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      Alert.alert('Error de conexión', error.message);
    }
  };

  return (
    <View
      style={[
        tw`flex-1 justify-center px-6`,
        theme === 'dark' ? tw`bg-gray-800` : tw`bg-white`,
      ]}
    >
      {/* Logo */}
      <Image source={Logo} style={tw`w-24 h-24 mx-auto mb-6`} />

      <Text
        style={[
          tw`text-3xl font-bold text-center mb-8`,
          theme === 'dark' ? tw`text-white` : tw`text-black`,
        ]}
      >
        Inicio de Sesión
      </Text>

      {/* Input de correo electrónico */}
      <View
        style={[
          tw`border rounded-lg px-4 py-3 mb-4 flex-row items-center`,
          theme === 'dark' ? tw`bg-gray-700 border-gray-600` : tw`bg-gray-100 border-gray-300`,
        ]}
      >
        <Icon name="mail" size={24} color={theme === 'dark' ? '#aaa' : '#555'} />
        <TextInput
          placeholder="Correo Electrónico"
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
          style={[tw`ml-4 flex-1 text-lg`, theme === 'dark' ? tw`text-white` : tw`text-black`]}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Input de contraseña */}
      <View
        style={[
          tw`border rounded-lg px-4 py-3 mb-4 flex-row items-center`,
          theme === 'dark' ? tw`bg-gray-700 border-gray-600` : tw`bg-gray-100 border-gray-300`,
        ]}
      >
        <Icon name="lock-closed" size={24} color={theme === 'dark' ? '#aaa' : '#555'} />
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
          style={[tw`ml-4 flex-1 text-lg`, theme === 'dark' ? tw`text-white` : tw`text-black`]}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye' : 'eye-off'}
            size={24}
            color={theme === 'dark' ? '#aaa' : '#555'}
          />
        </TouchableOpacity>
      </View>

      {/* Recordar y Olvidar Contraseña */}
      <View style={tw`flex-row items-center mb-6`}>
        <CheckBox
          value={rememberMe}
          onValueChange={setRememberMe}
          tintColors={{ true: theme === 'dark' ? '#1DA1F2' : '#007AFF', false: '#aaa' }}
          style={{ width: 24, height: 24 }}
        />
        <Text
          style={[
            tw`ml-3 text-lg`,
            theme === 'dark' ? tw`text-white` : tw`text-black`,
          ]}
        >
          Recordar
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Recovery')} style={tw`ml-auto`}>
          <Text style={[tw`text-blue-500 text-lg font-semibold`, {color:'#3D9FB3'}]}>¿Olvidaste la contraseña?</Text>
        </TouchableOpacity>
      </View>
      {/* Botón de ingresar */}
      <TouchableOpacity
        style={[
          tw`py-4 rounded-lg mb-6`,
          {
            backgroundColor: theme === 'dark' ? '#3A8FA3' : '#0CC0DF', // Diferentes colores para los temas
          },
        ]}
        onPress={handleLogin}
      >
        <Text style={tw`text-white text-center text-lg font-bold`}>Ingresar</Text>
      </TouchableOpacity>


      {/* Registrarse */}
      <Text
        style={[
          tw`text-center mb-6 text-lg`,
          theme === 'dark' ? tw`text-white` : tw`text-black`,
        ]}
      >
        ¿Aún no tienes cuenta?{' '}
        <Text onPress={() => navigation.navigate('Register')} style={[tw`text-blue-500 font-semibold text-lg`,{color:'#3D9FB3'}]}>
          Registrarse
        </Text>
      </Text>

      {/* Botones de redes sociales */}
      <View style={tw`flex-row justify-center mb-8`}>
        <TouchableOpacity style={tw`p-4 bg-gray-100 rounded-lg mr-4`}>
          <Image source={AppleIcon} style={{ width: 32, height: 32 }} />
        </TouchableOpacity>
        <TouchableOpacity style={tw`p-4 bg-gray-100 rounded-lg`}>
          <Image source={GoogleIcon} style={{ width: 32, height: 32 }} />
        </TouchableOpacity>
      </View>

      {/* Política de privacidad */}
      <View style={tw`flex-row justify-center`}>
        <TouchableOpacity>
          <Text style={[tw`text-lg`,{color:'#3D9FB3'}]}>Política de privacidad</Text>
        </TouchableOpacity>
        <Text style={tw`mx-2 text-lg text-gray-500`}>|</Text>
        <TouchableOpacity>
          <Text style={[tw`text-lg `,{color:'#3D9FB3'}]}>Términos de uso</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
