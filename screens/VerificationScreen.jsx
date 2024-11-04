// VerificationScreen.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const VerificationScreen = ({ navigation, route }) => {
  const { email } = route.params; // Recibe el correo electrónico como parámetro de navegación
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(150); // Tiempo de expiración en segundos (2:30)

  // Maneja los cambios en el código
  const handleCodeChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  // Lógica para manejar la verificación del código
  const handleVerify = async () => {
    const enteredCode = code.join('');

    try {
      const response = await fetch('http://10.0.2.2:8000/usuario/verificarcodigo', {
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
      console.log('Route params:', route?.params);

      if (response.ok) {
        Alert.alert('Código verificado correctamente');
        navigation.navigate('Reset',{email}); // Cambia a la pantalla deseada
        

      } else {
        Alert.alert('Código incorrecto', result.error || 'El código ingresado es incorrecto.');
      }
    } catch (error) {
      Alert.alert('Error de conexión:', error.message);
    }
  };

  // Función para manejar el temporizador (opcional)
  React.useEffect(() => {
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

      <TouchableOpacity onPress={() => Alert.alert('Código reenviado')}>
        <Text style={tw`text-blue-500 text-center mt-4`}>Enviar de Nuevo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerificationScreen;
