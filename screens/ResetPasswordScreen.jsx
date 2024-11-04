import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';

const ResetPasswordScreen = ({navigation, route}) => {
  const { email } = route.params; // Obtiene el email de los parámetros de navegación
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validaciones de la contraseña
  const isMinLength = password.length >= 6;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordsMatch = password === confirmPassword;

  // Función para manejar el envío de la solicitud
  const handleSubmit = async () => {
    if (!isMinLength || !hasNumber || !hasSpecialChar || !passwordsMatch) {
      Alert.alert('Error', 'Por favor, asegúrate de cumplir con todos los requisitos.');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:8000/usuario/resetcontrasena', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: email, // Sustituye esto con el correo adecuado
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', data.message || 'Contraseña actualizada con éxito.');
        navigation.navigate('Login')
      } else {
        Alert.alert('Error', data.error || 'Hubo un problema al actualizar la contraseña.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  return (
    <View style={tw`flex-1 bg-white px-6 pt-12`}>
      <TouchableOpacity>
        <Text style={tw`text-gray-500 mb-6`}>← Regresar</Text>
      </TouchableOpacity>

      <Text style={tw`text-2xl font-semibold text-center mb-2`}>
        Restablecer Contraseña
      </Text>
      <Text style={tw`text-gray-500 text-center mb-6`}>
        Por favor ingrese su nueva contraseña
      </Text>

      {/* Campo de contraseña */}
      <View style={tw`flex-row items-center border border-gray-300 rounded-lg px-3 py-2 mb-4`}>
        <View style={tw`w-5 h-5 bg-gray-300 rounded-full`} />
        <TextInput
          style={tw`flex-1 ml-3 text-gray-700`}
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={tw`text-gray-500 text-lg`}>
            {showPassword ? "👁️‍🗨️" : "👁️"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Campo de confirmación de contraseña */}
      <View style={tw`flex-row items-center border border-gray-300 rounded-lg px-3 py-2 mb-4`}>
        <View style={tw`w-5 h-5 bg-gray-300 rounded-full`} />
        <TextInput
          style={tw`flex-1 ml-3 text-gray-700`}
          placeholder="Confirmar Contraseña"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Text style={tw`text-gray-500 text-lg`}>
            {showConfirmPassword ? "👁️‍🗨️" : "👁️"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Requisitos de la contraseña */}
      <View style={tw`mb-8`}>
        <View style={tw`flex-row items-center mb-2`}>
          <Text style={tw`text-lg ${isMinLength ? 'text-green-500' : 'text-gray-300'}`}>
            {isMinLength ? "✔️" : "⭕"}
          </Text>
          <Text style={tw`ml-3 ${isMinLength ? 'text-black font-semibold' : 'text-gray-500'}`}>
            Al menos 6 caracteres
          </Text>
        </View>
        <View style={tw`flex-row items-center mb-2`}>
          <Text style={tw`text-lg ${hasNumber ? 'text-green-500' : 'text-gray-300'}`}>
            {hasNumber ? "✔️" : "⭕"}
          </Text>
          <Text style={tw`ml-3 ${hasNumber ? 'text-black font-semibold' : 'text-gray-500'}`}>
            Contiene un número
          </Text>
        </View>
        <View style={tw`flex-row items-center mb-2`}>
          <Text style={tw`text-lg ${hasSpecialChar ? 'text-green-500' : 'text-gray-300'}`}>
            {hasSpecialChar ? "✔️" : "⭕"}
          </Text>
          <Text style={tw`ml-3 ${hasSpecialChar ? 'text-black font-semibold' : 'text-gray-500'}`}>
            Contiene un carácter especial
          </Text>
        </View>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-lg ${passwordsMatch ? 'text-green-500' : 'text-gray-300'}`}>
            {passwordsMatch ? "✔️" : "⭕"}
          </Text>
          <Text style={tw`ml-3 ${passwordsMatch ? 'text-black font-semibold' : 'text-gray-500'}`}>
            Las contraseñas coinciden
          </Text>
        </View>
      </View>

      {/* Botón de continuar */}
      <TouchableOpacity
        style={tw`bg-blue-500 py-3 rounded-lg`}
        disabled={!isMinLength || !hasNumber || !hasSpecialChar || !passwordsMatch}
        onPress={handleSubmit}
      >
        <Text style={tw`text-white text-center font-semibold`}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPasswordScreen;
