import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import Navbar from '../assets/NavBar'; // Ajusta la ruta según tu estructura
import Header from '../assets/Header'; // Ajusta la ruta según tu estructura

const HomeScreen = ({ navigation }) => {
  
  const toggleNavbar = () => {
    // Lógica para abrir/cerrar el navbar
  };

  return (
    <View style={tw`flex-1`}>
      {/* Incluir el Header */}
      <Header toggleNavbar={toggleNavbar} />
      
      {/* Incluir el Navbar */}
      <Navbar navigation={navigation} />
      
      {/* Contenido de la pantalla */}
      <View style={tw`flex-1 justify-center items-center px-4`}>
        <Text style={tw`text-3xl font-bold text-center mb-5`}>Bienvenido a la App!</Text>
        <Text style={tw`text-lg text-center mb-5`}>
          Aquí puedes ver la información y navegar a otras secciones de la aplicación.
        </Text>
      </View>
    </View>
  );
};

export default HomeScreen;
