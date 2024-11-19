import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Image, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import Logo from "../icons/logotra.png";
import { SettingsContext } from '../assets/SettingsContext';

const apiUrl = Config.API_URL;

const RegisterScreen = ({ navigation }) => {
  const { theme } = useContext(SettingsContext);
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const date = selectedDate.toISOString().split('T')[0];
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
    <View style={[tw`flex-1 justify-center px-4`, theme === 'dark' ? tw`bg-gray-800` : tw`bg-white`]}>
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

      {/* Logo */}
      <Image source={Logo} style={tw`w-24 h-24 mx-auto mb-6`} />

      <Text
        style={[
          tw`text-3xl font-bold text-center mb-6`,
          theme === 'dark' ? tw`text-white` : tw`text-black`,
        ]}
      >
        Registrarse
      </Text>

      {/* Input de Nombre */}
      <View style={[styles.inputContainer]}>
        <Icon name="person-outline" size={24} color="black" style={styles.icon} />
        <TextInput
          placeholder="Nombre Completo"
          placeholderTextColor="#555"
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />
      </View>

      {/* Input de Fecha de Nacimiento */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <View style={styles.inputContainer}>
          <Icon name="calendar-outline" size={24} color="black" style={styles.icon} />
          <TextInput
            placeholder="Fecha de Nacimiento"
            placeholderTextColor="#555"
            style={styles.input}
            value={fechaNacimiento}
            editable={false}
          />
        </View>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}

      {/* Input de Teléfono */}
      <View style={styles.inputContainer}>
        <Icon name="call-outline" size={24} color="black" style={styles.icon} />
        <TextInput
          placeholder="Teléfono"
          placeholderTextColor="#555"
          style={styles.input}
          keyboardType="phone-pad"
          value={telefono}
          onChangeText={setTelefono}
        />
      </View>

      {/* Input de Correo */}
      <View style={styles.inputContainer}>
        <Icon name="mail-outline" size={24} color="black" style={styles.icon} />
        <TextInput
          placeholder="Correo Electrónico"
          placeholderTextColor="#555"
          style={styles.input}
          keyboardType="email-address"
          value={correo}
          onChangeText={setCorreo}
        />
      </View>

      {/* Input de Contraseña */}
      <View style={styles.inputContainer}>
        <Icon name="lock-closed-outline" size={24} color="black" style={styles.icon} />
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#555"
          style={styles.input}
          secureTextEntry={!showPassword}
          value={contrasena}
          onChangeText={setContrasena}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? "eye-outline" : "eye-off-outline"} size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Botón de Registrar */}
      <TouchableOpacity
        onPress={handleRegister}
        style={[tw`p-4 mb-4 rounded-lg`, { backgroundColor: '#0CC0DF' }]}
      >
        <Text style={tw`text-center text-white font-bold text-xl`}>Registrar</Text>
      </TouchableOpacity>

      {/* Términos y condiciones */}
      <View style={tw`flex-row justify-center mb-4`}>
        <TouchableOpacity>
          <Text style={[tw`text-lg font-semibold`, { color: '#3D9FB3' }]}>Política de privacidad</Text>
        </TouchableOpacity>
        <Text style={tw`mx-2 text-lg text-gray-500`}>|</Text>
        <TouchableOpacity>
          <Text style={[tw`text-lg font-semibold`, { color: '#3D9FB3' }]}>Términos de uso</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB', // Contorno
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16, // Tamaño más grande
    color: '#000',
  },
});

export default RegisterScreen;
