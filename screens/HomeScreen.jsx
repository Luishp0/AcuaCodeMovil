import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import Navbar from '../assets/NavBar'; // Ajusta la ruta según tu estructura
import { SettingsContext } from '../assets/SettingsContext';

const HomeScreen = ({ navigation }) => {
  const { theme } = useContext(SettingsContext); // Obtén el tema actual del contexto

  return (
    <View style={[tw`flex-1`, theme === 'dark' ? tw`bg-gray-800` : tw`bg-white`]}>
      {/* Incluir el Navbar */}
      <Navbar navigation={navigation} />
      
      {/* Contenido de la pantalla */}
      <View style={tw`flex-1 justify-center items-center px-4`}>
        <Text style={[tw`text-3xl font-bold text-center mb-5`, theme === 'dark' ? tw`text-white` : tw`text-black`]}>
          Bienvenido a la App!
        </Text>
        <Text style={[tw`text-lg text-center mb-5`, theme === 'dark' ? tw`text-gray-300` : tw`text-gray-700`]}>
          Aquí puedes ver la información y navegar a otras secciones de la aplicación.
        </Text>
      </View>
    </View>
  );
};

export default HomeScreen;
