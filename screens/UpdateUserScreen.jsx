import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, Alert, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import tw from 'twrnc';
import Navbar from '../assets/NavBar';
import { launchImageLibrary } from 'react-native-image-picker';
import Config from 'react-native-config';
import { SettingsContext } from '../assets/SettingsContext';

const apiUrl = Config.API_URL;

const UpdateUserScreen = ({ navigation }) => {
  const { theme } = useContext(SettingsContext); 
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setNombre(parsedData.nombre || '');
        setTelefono(parsedData.telefono || '');
        setCorreo(parsedData.correo || '');
        setFecha(new Date(parsedData.fechaNacimiento || new Date()));
        setProfileImage(parsedData.fotos?.url || null);
      }
    };
    loadUserData();
  }, []);

  const handleSave = async () => {
    // Lógica para guardar cambios
  };

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowDatePicker(false);
    setFecha(currentDate);
  };

  return (
    <View style={[tw`flex-1`, theme === 'dark' ? tw`bg-gray-800` : tw`bg-white`]}>
      {/* Navbar */}
      <Navbar navigation={navigation} />

      {/* Contenido desplazable */}
      <ScrollView contentContainerStyle={tw`px-4 pt-4 pb-10`}>
        {/* Imagen de perfil */}
        <TouchableOpacity onPress={handleImagePick} style={tw`items-center mb-4`}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={[
                tw`w-44 h-44 rounded-full border-2`,
                theme === 'dark' ? tw`border-gray-400` : tw`border-blue-500`,
              ]}
            />
          ) : (
            <View
              style={[
                tw`w-24 h-24 rounded-full bg-gray-300 items-center justify-center`,
                theme === 'dark' ? tw`bg-gray-600` : null,
              ]}
            >
              <Text style={tw`text-gray-600`}>Agregar Imagen</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Inputs */}
        <TextInput
          style={[
            tw`border rounded-lg p-3 mb-4`,
            theme === 'dark' ? tw`border-gray-600 bg-gray-700 text-white` : tw`border-blue-500 bg-white text-black`,
          ]}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Nombre Completo"
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
        />
        <TextInput
          style={[
            tw`border rounded-lg p-3 mb-4`,
            theme === 'dark' ? tw`border-gray-600 bg-gray-700 text-white` : tw`border-blue-500 bg-white text-black`,
          ]}
          value={telefono}
          onChangeText={setTelefono}
          placeholder="Teléfono"
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
          keyboardType="phone-pad"
        />
        <TextInput
          style={[
            tw`border rounded-lg p-3 mb-4`,
            theme === 'dark' ? tw`border-gray-600 bg-gray-700 text-white` : tw`border-blue-500 bg-white text-black`,
          ]}
          value={correo}
          onChangeText={setCorreo}
          placeholder="Correo Electrónico"
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
          keyboardType="email-address"
        />

        {/* Fecha de nacimiento */}
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={[
            tw`border rounded-lg p-3 mb-4`,
            theme === 'dark' ? tw`border-gray-600 bg-gray-700` : tw`border-blue-500 bg-white`,
          ]}
        >
          <Text style={theme === 'dark' ? tw`text-white` : tw`text-black`}>
            {fecha ? fecha.toLocaleDateString() : 'Fecha de Nacimiento'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker value={fecha} mode="date" display="default" onChange={handleDateChange} />
        )}

        {/* Botón de guardar */}
        <TouchableOpacity
          style={[
            tw`rounded-lg py-3 items-center`,
            hasChanges ? (theme === 'dark' ? tw`bg-blue-600` : tw`bg-blue-500`) : tw`bg-gray-400`,
          ]}
          onPress={handleSave}
          disabled={!hasChanges}
        >
          <Text style={tw`text-white text-lg font-semibold`}>
            {hasChanges ? 'Guardar' : 'Sin cambios'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default UpdateUserScreen;
