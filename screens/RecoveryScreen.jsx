import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Config from 'react-native-config';
import { SettingsContext } from '../assets/SettingsContext';
import tw from 'twrnc';

const apiUrl = Config.API_URL;

const RecoveryScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const { theme } = useContext(SettingsContext);

  const handlePasswordReset = async () => {
    try {
      const response = await fetch(`${apiUrl}usuario/enviarcorreo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: email }),
      });

      console.log('Response Status:', response.status);

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Enlace de recuperación enviado', `Revisa tu correo ${email}`);
        navigation.navigate('Verification', { email });
      } else {
        console.log('Server Response:', result);
        Alert.alert('Error', result.message || 'No se pudo enviar el enlace de recuperación');
      }
    } catch (error) {
      console.log('Fetch error:', error);
      Alert.alert('Error de conexión', error.message);
    }
  };

  return (
    <View
      style={[
        tw`flex-1 justify-center px-4`,
        theme === 'dark' ? tw`bg-gray-800` : tw`bg-white`,
      ]}
    >
      <Text
        style={[
          tw`text-3xl font-bold text-center mb-6`,
          theme === 'dark' ? tw`text-white` : tw`text-black`,
        ]}
      >
        Recuperación de Contraseña
      </Text>

      <TextInput
        placeholder="Correo Electrónico"
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
        style={[
          tw`border p-3 mb-5 rounded-lg text-lg`,
          theme === 'dark' ? tw`bg-gray-700 text-white` : tw`bg-gray-100 text-black`,
        ]}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        style={[
          tw`py-3 rounded-full mb-4`,
          theme === 'dark' ? tw`bg-blue-500` : tw`bg-blue-600`,
        ]}
        onPress={handlePasswordReset}
      >
        <Text style={tw`text-white text-center text-lg font-semibold`}>
          Enviar Enlace de Recuperación
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          tw`py-3 rounded-full`,
          theme === 'dark' ? tw`bg-gray-600` : tw`bg-gray-300`,
        ]}
        onPress={() => navigation.goBack()}
      >
        <Text
          style={[
            tw`text-center text-lg font-semibold`,
            theme === 'dark' ? tw`text-white` : tw`text-black`,
          ]}
        >
          Regresar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecoveryScreen;
