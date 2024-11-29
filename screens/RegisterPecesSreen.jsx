import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';
import { SettingsContext } from '../assets/SettingsContext';

const RegisterPecesScreen = () => {
  const { theme } = useContext(SettingsContext);
  const isDarkMode = theme === 'dark';

  const handleAdd = () => {
    // Aquí puedes manejar la lógica para agregar un nuevo registro
    console.log('Agregar un nuevo pez');
  };

  return (
    <View
      style={[
        tw`flex-1 justify-center items-center p-6`,
        { backgroundColor: isDarkMode ? tw`bg-gray-800` : tw`bg-white` }, // Fondo dinámico
      ]}
    >
      {/* Título */}
      <Text
        style={[
          tw`text-xl font-bold mb-6`,
          { color: isDarkMode ? '#FFFFFF' : '#000000' }, // Texto dinámico
        ]}
      >
        Peces Registrados
      </Text>

      {/* Mensaje de no registros */}
      <Text
        style={[
          tw`text-center mb-8`,
          { color: isDarkMode ? '#B0BEC5' : '#6B7280' }, // Texto gris dinámico
        ]}
      >
        Aún no cuentas con registros
      </Text>

      {/* Botón para agregar */}
      <TouchableOpacity
        onPress={handleAdd}
        style={[
          tw`flex-row items-center justify-center px-6 py-3 rounded-lg`,
          { backgroundColor: '#36B3DA' }, // Color azul del botón
        ]}
      >
        <Icon name="add-circle-outline" size={24} color="#FFFFFF" />
        <Text style={tw`text-white font-bold text-lg ml-2`}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterPecesScreen;
