import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const Navbar = ({ navigation }) => {
  
  const handleNavigate = (screen) => {
    navigation.navigate(screen); // Navega a la pantalla correspondiente
  };

  return (
    <View style={tw`bg-gray-800 p-4`}>
      {/* Menú Principal */}
      <View style={tw`mb-4`}>
        {/* Botón de Inicio */}
        <TouchableOpacity onPress={() => handleNavigate('Home')} style={tw`flex-row items-center mb-4`}>
          <Text style={tw`text-white text-lg font-bold`}>Inicio</Text>
        </TouchableOpacity>

        {/* Botón de Perfil */}
        <TouchableOpacity onPress={() => handleNavigate('UpdateUser')} style={tw`flex-row items-center mb-4`}>
          <Text style={tw`text-white text-lg font-bold`}>Perfil</Text>
        </TouchableOpacity>

        {/* Botón de Sustancias */}
        <TouchableOpacity onPress={() => handleNavigate('Substances')} style={tw`flex-row items-center mb-4`}>
          <Text style={tw`text-white text-lg font-bold`}>Sustancias</Text>
        </TouchableOpacity>

        {/* Botón de Calendario */}
        <TouchableOpacity onPress={() => handleNavigate('Calendar')} style={tw`flex-row items-center mb-4`}>
          <Text style={tw`text-white text-lg font-bold`}>Calendario</Text>
        </TouchableOpacity>
      </View>

      {/* Configuración */}
      <View style={tw`mb-4 border-t border-gray-600 pt-4`}>
        {/* Botón de Configuración */}
        <TouchableOpacity onPress={() => handleNavigate('Settings')} style={tw`flex-row items-center mb-4`}>
          <Text style={tw`text-white text-lg font-bold`}>Configuración</Text>
        </TouchableOpacity>

        {/* Botón de Cerrar Sesión */}
        <TouchableOpacity onPress={() => handleNavigate('Login')} style={tw`flex-row items-center`}>
          <Text style={tw`text-red-400 text-lg font-bold`}>Salir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;
