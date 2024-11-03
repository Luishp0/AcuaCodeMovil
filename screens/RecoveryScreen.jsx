// RecuperacionScreen.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import tw from 'twrnc';

const RecoveryScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8000/usuario/enviarcorreo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: email }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Enlace de recuperación enviado', `Revisa tu correo ${email}`);
      } else {
        Alert.alert('Error', result.message || 'No se pudo enviar el enlace de recuperación');
      }
    } catch (error) {
      Alert.alert('Error de conexión', error.message);
    }
  };

  return (
    <View style={tw`flex-1 justify-center px-4`}>
      <Text style={tw`text-2xl font-bold text-center mb-5`}>Recuperación de Contraseña</Text>
      
      <TextInput 
        placeholder="Correo Electrónico" 
        style={tw`border p-2 mb-4`} 
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      
      <Button title="Enviar Enlace de Recuperación" onPress={handlePasswordReset} color="#1DA1F2" />
      
      <Button title="Regresar" onPress={() => navigation.goBack()} color="gray" />
    </View>
  );
};

export default RecoveryScreen;
