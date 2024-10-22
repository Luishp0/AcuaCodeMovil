import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import tw from 'twrnc';
import Navbar from '../assets/NavBar'; // Ajusta la ruta según tu estructura


const UpdateUserScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [userId, setUserId] = useState(null); // Para guardar el ID del usuario

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const { id, nombre, telefono, correo, fechaNacimiento } = JSON.parse(userData);
        setUserId(id); // Guardar el ID del usuario
        setNombre(nombre);
        setTelefono(telefono);
        setCorreo(correo);
        setFecha(new Date(fechaNacimiento));
        setInitialData({ nombre, telefono, correo, fechaNacimiento });
      }
    };
    loadUserData();
  }, []);

  useEffect(() => {
    // Formato para evitar problemas con la fecha
    const initialDateFormatted = initialData.fechaNacimiento
      ? new Date(initialData.fechaNacimiento).toISOString().slice(0, 10)
      : null;
    const currentDateFormatted = fecha.toISOString().slice(0, 10);

    setHasChanges(
      nombre !== initialData.nombre ||
      telefono !== initialData.telefono ||
      correo !== initialData.correo ||
      currentDateFormatted !== initialDateFormatted
    );
  }, [nombre, telefono, correo, fecha, initialData]);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:8000/usuario/${userId}`, {
        method: 'PUT', // Cambia a PATCH si el backend usa PATCH
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          telefono,
          correo,
          fechaNacimiento: fecha.toISOString().slice(0, 10), // Formato de fecha compatible
          roles_idroles: 2 // Agregar el campo roles_idroles con valor fijo de 2
        }),
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Información actualizada correctamente');
        // Actualizar AsyncStorage con los nuevos datos
        const updatedData = {
          nombre,
          telefono,
          correo,
          fechaNacimiento: fecha.toISOString(),
          roles_idroles: 2, // Incluir roles_idroles en los datos guardados
        };
        await AsyncStorage.setItem('userData', JSON.stringify(updatedData));
        setInitialData(updatedData); // Actualizar los datos iniciales
        setHasChanges(false); // Desactivar el botón de guardar
      } else {
        const result = await response.json();
        Alert.alert('Error', result.message || 'No se pudo actualizar la información');
      }
    } catch (error) {
      Alert.alert('Error de conexión', error.message);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowDatePicker(Platform.OS === 'ios');
    setFecha(currentDate);
  };

  return (
    <View style={tw`flex-1`}>
      {/* Incluir el Navbar */}
      <Navbar navigation={navigation} />
      

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

      <TouchableOpacity
        style={[
          tw`rounded-lg py-3 items-center`, 
          hasChanges ? tw`bg-blue-500` : tw`bg-gray-400`
        ]}
        onPress={handleSave}
        disabled={!hasChanges} // Desactivar el botón si no hay cambios
      >
        <Text style={tw`text-white text-lg font-semibold`}>
          {hasChanges ? 'Guardar' : 'Sin cambios'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateUserScreen;
