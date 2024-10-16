import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import tw from 'twrnc';

const RegisterScreen = ({ navigation }) => {
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
      const response = await fetch('http://10.0.2.2:8000/usuario', {
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
    <View style={tw`flex-1 justify-center px-4`}>
      <Text style={tw`text-2xl font-bold text-center mb-5`}>Registrar</Text>
      <TextInput 
        placeholder="Nombre Completo" 
        style={tw`border p-2 mb-4`} 
        keyboardType='default'
        value={nombre}
        onChangeText={setNombre}
      />
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          placeholder="Fecha de Nacimiento"
          style={tw`border p-2 mb-4`}
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
        style={tw`border p-2 mb-4`} 
        keyboardType='email-address'
        value={correo}
        onChangeText={setCorreo}
      />
      <TextInput 
        placeholder="Telefono" 
        style={tw`border p-2 mb-4`} 
        keyboardType='phone-pad'
        value={telefono}
        onChangeText={setTelefono}
      />
      <TextInput 
        placeholder="Contraseña" 
        style={tw`border p-2 mb-4`} 
        secureTextEntry
        value={contrasena}
        onChangeText={setContrasena}
      />
      <View style={tw`mb-4`}>
        <Button title="Register" onPress={handleRegister} />
      </View>
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default RegisterScreen;
