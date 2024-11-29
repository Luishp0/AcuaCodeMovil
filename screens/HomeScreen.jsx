import React, { useContext } from 'react';
import { View, ScrollView, Text } from 'react-native';
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
      

      {/* Contenido de la pantalla en un ScrollView */}
      <ScrollView style={tw`flex-1`} contentContainerStyle={tw`p-4`}>
      <Text style={[tw`text-2xl font-bold px-4`, theme === 'dark' ? tw`text-white` : tw`text-black`]}>
        Bienvenido
      </Text>
        
        {/* Componente 1: StartContentScreen */}
        <View style={tw`mb-6`}>
          <StartContentScreen />
        </View>

        {/* Componente 2: InformacionPezScreen */}
        <View style={tw`mb-6`}>
          <InformacionPezScreen />
        </View>

        {/* Componente 3: RegisterPecesScreen */}
        <View>
          <RegisterPecesScreen />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
