import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { SettingsContext } from '../assets/SettingsContext';
import PezInicial from '../img/PezInicial.png';

const InformacionPezScreen = ({ navigation }) => {
  const { theme } = useContext(SettingsContext);

  const isDarkMode = theme === 'dark';

  return (
    <View
      style={[
        tw`flex-1 p-4`,
        { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' }, // Fondo dinámico según tema
      ]}
    >
      {/* Encabezado */}
      <Text
        style={[
          tw`text-xl font-bold mb-4`,
          { color: isDarkMode ? '#FFFFFF' : '#000000' }, // Texto dinámico
        ]}
      >
        Información
      </Text>

      {/* Contenedor de la tarjeta */}
      <TouchableOpacity
        style={[
          tw`rounded-lg overflow-hidden border-2`,
          {
            borderColor: '#3D84A7', // Contorno azul personalizado
            shadowColor: isDarkMode ? '#000000' : '#000',
            shadowOpacity: 0.1,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
          },
        ]}
        onPress={() => navigation.navigate('CollectionPeces')} // Redirigir al presionar la tarjeta
      >
        {/* Imagen del pez */}
        <Image
          source={PezInicial}
          style={tw`w-full h-48`}
          resizeMode="cover"
        />

        {/* Texto sobre la imagen */}
        <View
          style={[
            tw`absolute bottom-0 left-0 p-4`,
            {
              backgroundColor: 'rgba(0, 0, 0, 0.4)', // Fondo translúcido para el texto
              width: '100%',
            },
          ]}
        >
          <Text
            style={[tw`text-xl font-bold`, { color: '#FFFFFF' }]} // Texto blanco
          >
            Peces
          </Text>
          <Text
            style={[tw`text-sm`, { color: '#FFFFFF' }]} // Texto blanco
          >
            Especies de peces para acuarios
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default InformacionPezScreen;
