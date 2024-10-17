import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import tw from 'twrnc';

const UpdateUserScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const { nombre, telefono, correo, fechaNacimiento } = JSON.parse(userData);
        setNombre(nombre);
        setTelefono(telefono);
        setCorreo(correo);
        setFecha(new Date(fechaNacimiento));
      }
    };
    loadUserData();
  }, []);

  const handleSave = () => {
    alert('Información actualizada');
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowDatePicker(Platform.OS === 'ios'); // Cierra el selector en Android después de seleccionar
    setFecha(currentDate);
  };

  return (
    <View style={tw`flex-1 bg-gray-100 p-5`}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mb-5`}>
        <Text style={tw`text-blue-500`}>Regresar</Text>
      </TouchableOpacity>

      <TextInput
        style={tw`border border-blue-500 rounded-lg p-3 mb-4`}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre Completo"
      />
      
      <TextInput
        style={tw`border border-blue-500 rounded-lg p-3 mb-4`}
        value={telefono}
        onChangeText={setTelefono}
        placeholder="Teléfono"
        keyboardType="phone-pad"
      />

      <TextInput
        style={tw`border border-blue-500 rounded-lg p-3 mb-4`}
        value={correo}
        onChangeText={setCorreo}
        placeholder="Correo Electrónico"
        keyboardType="email-address"
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={tw`border border-blue-500 rounded-lg p-3 mb-4`}>
        <Text style={tw`text-gray-600`}>
          {fecha ? fecha.toLocaleDateString() : 'Fecha de Nacimiento'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity style={tw`bg-blue-400 rounded-lg py-3 items-center`} onPress={handleSave}>
        <Text style={tw`text-white text-lg font-semibold`}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateUserScreen;
