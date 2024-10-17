import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import tw from 'twrnc';

const UpdateUserScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('Luis');
  const [telefono, setTelefono] = useState('3334501916');
  const [correo, setCorreo] = useState('luis.hernandez.s21@utzmg.edu.com');
  const [contrasena, setContrasena] = useState('********');
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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
      {/* Botón para regresar al inicio */}
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

      <TextInput
        style={tw`border border-blue-500 rounded-lg p-3 mb-4`}
        value={contrasena}
        onChangeText={setContrasena}
        placeholder="Contraseña"
        secureTextEntry
      />

      {/* Campo para la fecha de nacimiento con DatePicker */}
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
