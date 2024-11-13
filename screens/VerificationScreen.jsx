import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import Config from 'react-native-config';

const apiUrl = Config.API_URL;


const VerificationScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(150);

  const handleCodeChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const handleVerify = async () => {
    const enteredCode = code.join('');

    try {
      const response = await fetch(`${apiUrl}usuario/verificarcodigo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: email,
          codigoVerificacion: enteredCode,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Código verificado correctamente');
        navigation.navigate('Reset', { email });
      } else {
        Alert.alert('Código incorrecto', result.error || 'El código ingresado es incorrecto.');
      }
    } catch (error) {
      Alert.alert('Error de conexión:', error.message);
    }
  };

  // Actualizar el temporizador
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Función para reenviar el código
  const handleResendCode = async () => {
    try {
      const response = await fetch(`${apiUrl}usuario/reenviarcodigo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: email }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Código reenviado', 'Hemos enviado un nuevo código de verificación.');
        setTimer(150); // Restablece el temporizador a 2:30
      } else {
        Alert.alert('Error al reenviar', result.error || 'No se pudo reenviar el código.');
      }
    } catch (error) {
      Alert.alert('Error de conexión:', error.message);
    }
  };

  return (
    <View style={tw`flex-1 justify-center px-4`}>
      <Text style={tw`text-2xl font-bold text-center mb-5`}>Verificación</Text>
      <Text style={tw`text-center mb-5`}>
        Le hemos enviado un código para verificar su dirección de correo electrónico.
      </Text>

      <View style={tw`flex-row justify-center mb-5`}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={tw`border w-10 h-12 text-center mx-1`}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleCodeChange(index, value)}
          />
        ))}
      </View>

      <Text style={tw`text-center mb-5`}>
        El código caduca en: <Text style={tw`text-blue-500`}>{formatTime(timer)}</Text>
      </Text>

      <Button title="Verificar" onPress={handleVerify} color="#1DA1F2" />

      <TouchableOpacity onPress={handleResendCode}>
        <Text style={tw`text-blue-500 text-center mt-4`}>Enviar de Nuevo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerificationScreen;
