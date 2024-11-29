import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import Navbar from '../assets/NavBar'; // Ajusta la ruta según tu estructura
import { SettingsContext } from '../assets/SettingsContext';
import StartContentScreen from './StartContentScreen';
import InformacionPezScreen from './InformationPezScreen';
import RegisterPecesScreen from './RegisterPecesSreen';

const HomeScreen = ({ navigation }) => {
  const { theme } = useContext(SettingsContext); // Obtén el tema actual del contexto

  return (
    <View style={[tw`flex-1`, theme === 'dark' ? tw`bg-gray-800` : tw`bg-white`]}>
      {/* Incluir el Navbar */}
      <Navbar navigation={navigation} />

      {/* Título */}
      <Text
        style={[
          tw`text-2xl font-bold px-4 mt-4`,
          theme === 'dark' ? tw`text-white` : tw`text-black`,
        ]}
      >
        Bienvenido
      </Text>

      {/* Componentes */}
      <View style={tw`flex-1 mt-4`}>
        {/* Componente 1: StartContentScreen */}
        <StartContentScreen />

        {/* Componente 2: InformacionPezScreen */}
        <InformacionPezScreen navigation={navigation} />

        {/* Componente 3: RegisterPecesScreen */}
        <RegisterPecesScreen />
      </View>
    </View>
  );
};

export default HomeScreen;
