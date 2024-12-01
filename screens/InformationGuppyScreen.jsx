import React, { useContext } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons'; // Icono para el botón de regreso
import { SettingsContext } from '../assets/SettingsContext';
import Guppy from '../img/Guppy.jpg';
import GuppyUno from '../img/Guppy/GuppyUno.png';
import GuppyDos from '../img/Guppy/GuppyDos.png';
import GuppyTres from '../img/Guppy/GuppyTres.png';
import GuppyCuatro from '../img/Guppy/GuppyCuatro.png';
import GuppyCinco from '../img/Guppy/GuppyCinco.png';

const { width } = Dimensions.get('window'); // Obtiene el ancho de la pantalla

const InformationGuppyScreen = ({ navigation }) => {
  const { theme } = useContext(SettingsContext); // Contexto para el tema

  const textColor = theme === 'dark' ? tw`text-white` : tw`text-black`;

  const images = [GuppyUno, GuppyDos, GuppyTres, GuppyCuatro, GuppyCinco];

  return (
    <ScrollView
      style={[
        tw`flex-1`,
        theme === 'dark' ? tw`bg-gray-900` : tw`bg-white`, // Fondo según el tema
      ]}
    >
      {/* Imagen de fondo */}
      <View style={tw`relative h-48`}>
        <Image
          source={Guppy}
          style={tw`w-full h-full`}
          resizeMode="cover"
        />
        {/* Botón de regreso */}
        <TouchableOpacity
          style={tw`absolute top-3 left-3 flex-row items-center`}
          onPress={() => navigation.navigate('CollectionPeces')}
        >
          <Icon
            name="arrow-back"
            size={24}
            color={theme === 'dark' ? 'white' : 'black'}
            style={tw`mr-2`}
          />
          <Text style={[textColor, tw`text-lg font-semibold`]}>Regresar</Text>
        </TouchableOpacity>
        {/* Título */}
        <Text
          style={[
            tw`absolute bottom-3 left-3 font-bold`,
            textColor,
            { fontSize: 28 },
          ]}
        >
          Guppy
        </Text>
      </View>

      {/* Sección de parámetros */}
      <View style={tw`p-4`}>
        <Text style={[tw`font-bold`, textColor, { fontSize: 20 }]}>
          Parámetros del Entorno Acuático
        </Text>
        <View style={tw`flex-row flex-wrap justify-between mt-4`}>
          {/* Parámetros individuales */}
          {[
            { label: 'Temperatura', value: '24-28°C' },
            { label: 'pH', value: '7.0-7.8' },
            { label: 'Oxígeno', value: '5-8 mg/l' },
            { label: 'Dureza', value: '8-12 dGH' },
            { label: 'Nitritos', value: '0 ppm' },
            { label: 'Nitratos', value: '<40 ppm' },
          ].map((param, index) => (
            <View key={index} style={tw`w-1/2 p-3`}>
              <Text style={[tw`font-bold`, textColor, { fontSize: 18 }]}>
                {param.label}
              </Text>
              <Text style={[textColor, { fontSize: 16 }]}>{param.value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Sección de alimentación */}
      <View style={tw`p-4`}>
        <Text style={[tw`font-bold`, textColor, { fontSize: 20 }]}>
          Alimentación
        </Text>
        <Text style={[tw`mt-2`, textColor, { fontSize: 16 }]}>
          Consiste en alimentos en escamas, alimentos vivos (como dafnias y
          larvas de mosquito), alimentos congelados (como camarones),
          alimentos específicos para guppys y ocasionalmente alimentos
          vegetales. Es importante no sobrealimentarlos y ofrecer una dieta
          equilibrada para mantener su salud.
        </Text>
      </View>

      {/* Carrusel de imágenes */}
      <View style={tw`p-4 mt-8`}>
        <Text style={[tw`font-bold mb-4`, textColor, { fontSize: 20 }]}>
          Galería
        </Text>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`items-center`}
        >
          {images.map((img, index) => (
            <View
              key={index}
              style={[
                tw`mx-2 rounded-lg overflow-hidden`,
                { width: width * 0.8, height: 200 },
              ]}
            >
              <Image
                source={img}
                style={tw`w-full h-full`}
                resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default InformationGuppyScreen;
