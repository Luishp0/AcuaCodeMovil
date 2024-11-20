import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importa iconos
import Config from 'react-native-config';
import tw from 'twrnc';
import { SettingsContext } from '../assets/SettingsContext';

const apiUrl = Config.API_URL;

const ResetPasswordScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const { theme } = useContext(SettingsContext);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isMinLength = password.length >= 6;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordsMatch = password === confirmPassword;

  const handleSubmit = async () => {
    if (!isMinLength || !hasNumber || !hasSpecialChar || !passwordsMatch) {
      Alert.alert('Error', 'Por favor, asegúrate de cumplir con todos los requisitos.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}usuario/resetcontrasena`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', data.message || 'Contraseña actualizada con éxito.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.error || 'Hubo un problema al actualizar la contraseña.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  return (
    <View
      style={[
        tw`flex-1 items-center justify-center px-6`,
        theme === 'dark' ? tw`bg-gray-800` : tw`bg-white`,
      ]}
    >
      {/* Botón de Regresar */}
      <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`absolute top-4 left-4 flex-row items-center`}
          >
            <Icon name="arrow-back" size={24} color={theme === 'dark' ? '#FFF' : '#000'} />
            <Text
              style={[
                tw`ml-2 text-xl font-medium`,
                theme === 'dark' ? tw`text-white` : tw`text-black`,
              ]}
            >
              Regresar
            </Text>
          </TouchableOpacity>
      <Text
        style={[
          tw`text-3xl font-semibold text-center mb-4`,
          theme === 'dark' ? tw`text-white` : tw`text-black`,
        ]}
      >
        Restablecer Contraseña
      </Text>
      <Text
        style={[
          tw`text-center mb-6`,
          theme === 'dark' ? tw`text-gray-400` : tw`text-gray-500`,
        ]}
      >
        Por favor ingrese su nueva contraseña
      </Text>

      {/* Campo de contraseña */}
      <View
        style={[
          tw`flex-row items-center border rounded-md px-4 py-3 mb-4 w-full`,
          theme === 'dark' ? tw`border-gray-600` : tw`border-gray-300`,
        ]}
      >
        <Icon name="lock-closed" size={20} color={theme === 'dark' ? '#aaa' : '#555'} />
        <TextInput
          style={[
            tw`flex-1 ml-3 text-lg`,
            theme === 'dark' ? tw`text-white` : tw`text-black`,
          ]}
          placeholder="Nueva Contraseña"
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye' : 'eye-off'} size={20} color={theme === 'dark' ? '#aaa' : '#555'} />
        </TouchableOpacity>
      </View>

      {/* Campo de confirmación de contraseña */}
      <View
        style={[
          tw`flex-row items-center border rounded-md px-4 py-3 mb-6 w-full`,
          theme === 'dark' ? tw`border-gray-600` : tw`border-gray-300`,
        ]}
      >
        <Icon name="lock-closed" size={20} color={theme === 'dark' ? '#aaa' : '#555'} />
        <TextInput
          style={[
            tw`flex-1 ml-3 text-lg`,
            theme === 'dark' ? tw`text-white` : tw`text-black`,
          ]}
          placeholder="Confirmar Contraseña"
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Icon name={showConfirmPassword ? 'eye' : 'eye-off'} size={20} color={theme === 'dark' ? '#aaa' : '#555'} />
        </TouchableOpacity>
      </View>

      {/* Requisitos de la contraseña */}
      <View style={tw`mb-8 w-full`}>
        {[{ isValid: isMinLength, text: 'Al menos 6 caracteres' },
          { isValid: hasNumber, text: 'Contiene un número' },
          { isValid: hasSpecialChar, text: 'Contiene un carácter especial' },
          { isValid: passwordsMatch, text: 'Las contraseñas coinciden' }]
          .map((item, index) => (
            <View key={index} style={tw`flex-row items-center mb-2`}>
              <Icon name={item.isValid ? 'checkmark-circle' : 'close-circle'} size={20} color={item.isValid ? 'green' : 'red'} />
              <Text style={tw`ml-3 text-lg ${item.isValid ? 'text-green-500 font-semibold' : 'text-red-500'}`}>
                {item.text}
              </Text>
            </View>
          ))}
      </View>

      {/* Botón de continuar */}
      <TouchableOpacity
        style={[
          tw`py-4 rounded-md w-full`,
          {
            backgroundColor: theme === 'dark' ? '#064E66' : '#0CC0DF', // Color para modo oscuro y claro
          },
          
        ]}
        disabled={!isMinLength || !hasNumber || !hasSpecialChar || !passwordsMatch}
        onPress={handleSubmit}
      >
        <Text style={tw`text-white text-center text-lg font-bold`}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPasswordScreen;
