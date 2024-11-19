import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Image, StyleSheet } from 'react-native';
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
      {/* Botón de Regresar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon
          name="arrow-back"
          size={24}
          color={theme === 'dark' ? '#FFF' : '#000'}
        />
        <Text
          style={[
            tw`ml-2 text-lg font-medium`,
            theme === 'dark' ? tw`text-white` : tw`text-black`,
          ]}
        >
          Regresar
        </Text>
      </TouchableOpacity>

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
      <View style={[styles.inputContainer, theme === 'dark' ? styles.darkInput : styles.lightInput]}>
        <Icon name="mail" size={20} color={theme === 'dark' ? '#FFF' : '#000'} style={styles.icon} />
        <TextInput
          placeholder="Correo Electrónico"
          placeholderTextColor={theme === 'dark' ? '#CCC' : '#555'}
          style={[styles.input, theme === 'dark' ? { color: '#FFF' } : { color: '#000' }]}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Input de contraseña */}
      <View style={[styles.inputContainer, theme === 'dark' ? styles.darkInput : styles.lightInput]}>
        <Icon name="lock-closed" size={20} color={theme === 'dark' ? '#FFF' : '#000'} style={styles.icon} />
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor={theme === 'dark' ? '#AAA' : '#555'}
          style={[styles.input, theme === 'dark' ? { color: '#FFF' } : { color: '#000' }]}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.touchableIcon}>
          <Icon name={showPassword ? 'eye' : 'eye-off'} size={20} color={theme === 'dark' ? '#FFF' : '#000'} />
        </TouchableOpacity>
      </View>

      <View style={tw`flex-row justify-between items-center mb-6`}>
        {/* Checkbox y Recordar */}
        <View style={tw`flex-row items-center`}>
          <CheckBox
            value={rememberMe}
            onValueChange={setRememberMe}
            tintColors={{ true: theme === 'dark' ? '#1DA1F2' : '#007AFF', false: '#aaa' }}
            style={styles.checkBox}
          />
          <Text style={[tw`ml-3 text-sm font-bold`, theme === 'dark' ? tw`text-white` : tw`text-black`]}>Recordar</Text>
        </View>

        {/* ¿Olvidaste la contraseña? */}
        <TouchableOpacity onPress={() => navigation.navigate('Recovery')} style={styles.touchableText}>
          <Text style={[tw`text-blue-500 text-sm font-semibold`, { fontSize: 14, color: '#3D9FB3' }]}>
            ¿Olvidaste la contraseña?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Botón de ingresar */}
      <TouchableOpacity
        style={[
          tw`py-4 rounded-lg mb-7`,
          {
            backgroundColor: theme === 'dark' ? '#3A8FA3' : '#0CC0DF',
          },
        ]}
        onPress={handleLogin}
      >
        <Text style={tw`text-white text-center text-xl font-bold`}>Ingresar</Text>
      </TouchableOpacity>

      {/* Registrarse */}
      <Text
        style={[
          tw`text-center mb-6 text-lg`,
          theme === 'dark' ? tw`text-white` : tw`text-black`,
        ]}
      >
        ¿Aún no tienes cuenta?{' '}
        <Text onPress={() => navigation.navigate('Register')} style={[tw`text-blue-500 font-semibold`, { color: '#3D9FB3' }]}>
          Registrarse
        </Text>
      </Text>

      {/* Botones de redes sociales */}
      <View style={tw`flex-row justify-center mb-8`}>
        <TouchableOpacity style={styles.socialButton}>
          {theme === 'dark' ? (
            <Icon name="logo-apple" size={40} color="#FFF" />
          ) : (
            <Image source={AppleIcon} style={styles.socialIcon} />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          {theme === 'dark' ? (
            <Icon name="logo-google" size={40} color="#FFF" />
          ) : (
            <Image source={GoogleIcon} style={styles.socialIcon} />
          )}
        </TouchableOpacity>
      </View>

      {/* Política de privacidad */}
      <View style={tw`flex-row justify-center`}>
        <TouchableOpacity>
          <Text style={[tw`text-xs`, { color: '#3D9FB3' }]}>Política de privacidad</Text>
        </TouchableOpacity>
        <Text style={tw`mx-2 text-xs text-gray-500`}>|</Text>
        <TouchableOpacity>
          <Text style={[tw`text-xs`, { color: '#3D9FB3' }]}>Términos de uso</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 12,
    backgroundColor: '#f9f8f9',
  },
  darkInput: {
    borderColor: '#4B5563',
  },
  lightInput: {
    borderColor: '#D1D5DB',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  touchableIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  socialButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
  checkBox: {
    width: 24,
    height: 24,
  },
  touchableText: {
    paddingHorizontal: 8,
  },
});

export default LoginScreen;
