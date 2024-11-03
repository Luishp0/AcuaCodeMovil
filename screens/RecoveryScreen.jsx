// RecuperacionScreen.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import tw from 'twrnc';

const RecoveryScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = () => {
    // Implementa aquí tu lógica para el restablecimiento de contraseña
    Alert.alert('Enlace de recuperación enviado', `Revisa tu correo ${email}`);
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
