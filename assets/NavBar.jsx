import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const Navbar = ({ navigation }) => {
  
  const handleUpdateUser = () => {
    navigation.navigate('UpdateUser'); // Navega a la pantalla de actualización de usuario
  };

  const handleLogout = () => {
    // Aquí puedes agregar la lógica para cerrar sesión
    // Por ejemplo, eliminar el token de autenticación y navegar a la pantalla de inicio de sesión
    navigation.replace('Login'); // Ejemplo de redirección a la pantalla de inicio de sesión
  };

  const handleHome = () => {
    navigation.navigate('Home'); // Navega a la pantalla principal
  };

  return (
    <View style={tw`flex-row justify-between bg-gray-800 p-4`}>
      {/* Botón de Inicio */}
      <TouchableOpacity onPress={handleHome} style={tw`items-center`}>
        <Text style={tw`text-white text-lg font-bold`}>Inicio</Text>
      </TouchableOpacity>

      {/* Botón de Actualizar Usuario */}
      <TouchableOpacity onPress={handleUpdateUser} style={tw`items-center`}>
        <Text style={tw`text-white text-lg font-bold`}>Actualizar Usuario</Text>
      </TouchableOpacity>

      {/* Botón de Cerrar Sesión */}
      <TouchableOpacity onPress={handleLogout} style={tw`items-center`}>
        <Text style={tw`text-red-400 text-lg font-bold`}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
