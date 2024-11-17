import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Config from 'react-native-config';
import tw from 'twrnc';
import { SettingsContext } from '../assets/SettingsContext';

const apiUrl = Config.API_URL;

const RegisterScreen = ({ navigation }) => {
  const { theme } = useContext(SettingsContext); // Obtén el tema actual
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const date = selectedDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      setFechaNacimiento(date);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(`${apiUrl}usuario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          fechaNacimiento,
          correo,
          telefono,
          contrasena,
        }),
      });
      const result = await response.json();

      if (response.ok) {
        Alert.alert('Usuario registrado exitosamente!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error al registrar usuario:', result.message || 'Inténtalo nuevamente.');
      }
    } catch (error) {
      Alert.alert('Error de conexión:', error.message);
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
          tw`text-2xl font-bold text-center mb-5`,
          theme === 'dark' ? tw`text-white` : tw`text-black`,
        ]}
      >
        Registrar
      </Text>
      <TextInput
        placeholder="Nombre Completo"
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
        style={[
          tw`border p-2 mb-4 rounded`,
          theme === 'dark' ? tw`bg-gray-700 text-white` : tw`bg-gray-100 text-black`,
        ]}
        keyboardType="default"
        value={nombre}
        onChangeText={setNombre}
      />
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          placeholder="Fecha de Nacimiento"
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
          style={[
            tw`border p-2 mb-4 rounded`,
            theme === 'dark' ? tw`bg-gray-700 text-white` : tw`bg-gray-100 text-black`,
          ]}
          value={fechaNacimiento}
          editable={false} // Esto evita que el usuario escriba manualmente
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}
      <TextInput
        placeholder="Correo"
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
        style={[
          tw`border p-2 mb-4 rounded`,
          theme === 'dark' ? tw`bg-gray-700 text-white` : tw`bg-gray-100 text-black`,
        ]}
        keyboardType="email-address"
        value={correo}
        onChangeText={setCorreo}
      />
      <TextInput
        placeholder="Teléfono"
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
        style={[
          tw`border p-2 mb-4 rounded`,
          theme === 'dark' ? tw`bg-gray-700 text-white` : tw`bg-gray-100 text-black`,
        ]}
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
      />
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
        style={[
          tw`border p-2 mb-4 rounded`,
          theme === 'dark' ? tw`bg-gray-700 text-white` : tw`bg-gray-100 text-black`,
        ]}
        secureTextEntry
        value={contrasena}
        onChangeText={setContrasena}
      />
      <View style={tw`mb-4`}>
        <Button
          title="Registrar"
          onPress={handleRegister}
          color={theme === 'dark' ? '#1DA1F2' : '#007AFF'}
        />
      </View>
      <Button
        title="Ir al Login"
        onPress={() => navigation.navigate('Login')}
        color={theme === 'dark' ? '#888' : 'gray'}
      />
    </View>
  );
};

export default RegisterScreen;
