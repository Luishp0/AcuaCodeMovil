import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'twrnc';
import Config from 'react-native-config';
import { SettingsContext } from '../assets/SettingsContext';

const apiUrl = Config.API_URL;

const VerificationScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const { theme } = useContext(SettingsContext); // Obtener el tema actual
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(150);
  const inputRefs = useRef([]); // Crear referencias para los inputs

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < code.length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
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
        setTimer(150);
      } else {
        Alert.alert('Error al reenviar', result.error || 'No se pudo reenviar el código.');
      }
    } catch (error) {
      Alert.alert('Error de conexión:', error.message);
    }
  };

  return (
    <View
      style={[
        tw`flex-1 justify-center px-6`,
        theme === 'dark' ? tw`bg-gray-800` : tw`bg-white`,
      ]}
    >
      <Text
        style={[
          tw`text-3xl font-bold text-center mb-6`,
          theme === 'dark' ? tw`text-white` : tw`text-black`,
        ]}
      >
        Verificación
      </Text>
      <Text
        style={[
          tw`text-lg text-center mb-8`,
          theme === 'dark' ? tw`text-gray-300` : tw`text-gray-700`,
        ]}
      >
        Le hemos enviado un código para verificar su dirección de correo electrónico.
      </Text>

      <View style={tw`flex-row justify-center mb-8`}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            style={[
              tw`mx-2 text-lg text-center rounded-lg`,
              theme === 'dark'
                ? tw`bg-gray-700 text-white border-gray-500`
                : tw`bg-gray-100 text-black border-gray-300`,
              styles.inputBox,
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleCodeChange(index, value)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace' && !digit && index > 0) {
                inputRefs.current[index - 1].focus();
              }
            }}
          />
        ))}
      </View>

      <Text
        style={[
          tw`text-center mb-8 text-lg`,
          theme === 'dark' ? tw`text-gray-300` : tw`text-gray-700`,
        ]}
      >
        El código caduca en: <Text style={tw`text-blue-500`}>{formatTime(timer)}</Text>
      </Text>

      <TouchableOpacity
        onPress={handleVerify}
        style={[tw`py-3 rounded-lg mb-4`, theme === 'dark' ? tw`bg-blue-600` : tw`bg-blue-500`, styles.button]}
      >
        <Text style={tw`text-white text-center text-lg font-bold`}>Verificar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleResendCode}>
        <Text style={tw`text-blue-500 text-center text-lg`}>Enviar de Nuevo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    width: 60,
    height: 60,
    fontSize: 24,
    borderWidth: 2,
  },
  button: {
    width: '100%',
  },
});

export default VerificationScreen;
