import React, { useContext } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons'; // Icono para el botón de regreso
import { SettingsContext } from '../assets/SettingsContext';
import Guppy from '../img/Guppy.jpg';

const InformationGuppyScreen = ({ navigation }) => {
  const { theme } = useContext(SettingsContext); // Contexto para el tema

  const textColor = theme === 'dark' ? tw`text-white` : tw`text-black`;

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
          onPress={() => navigation.goBack()}
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
          <View style={tw`w-1/2 p-3`}>
            <Text style={[tw`font-bold`, textColor, { fontSize: 18 }]}>
              Temperatura
            </Text>
            <Text style={[textColor, { fontSize: 16 }]}>24-28°C</Text>
          </View>
          <View style={tw`w-1/2 p-3`}>
            <Text style={[tw`font-bold`, textColor, { fontSize: 18 }]}>
              pH
            </Text>
            <Text style={[textColor, { fontSize: 16 }]}>7.0-7.8</Text>
          </View>
          <View style={tw`w-1/2 p-3`}>
            <Text style={[tw`font-bold`, textColor, { fontSize: 18 }]}>
              Oxígeno
            </Text>
            <Text style={[textColor, { fontSize: 16 }]}>5-8 mg/l</Text>
          </View>
          <View style={tw`w-1/2 p-3`}>
            <Text style={[tw`font-bold`, textColor, { fontSize: 18 }]}>
              Dureza
            </Text>
            <Text style={[textColor, { fontSize: 16 }]}>8-12 dGH</Text>
          </View>
          <View style={tw`w-1/2 p-3`}>
            <Text style={[tw`font-bold`, textColor, { fontSize: 18 }]}>
              Nitritos
            </Text>
            <Text style={[textColor, { fontSize: 16 }]}>0 ppm</Text>
          </View>
          <View style={tw`w-1/2 p-3`}>
            <Text style={[tw`font-bold`, textColor, { fontSize: 18 }]}>
              Nitratos
            </Text>
            <Text style={[textColor, { fontSize: 16 }]}>{"<"}40 ppm</Text>
          </View>
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
    </ScrollView>
  );
};

export default InformationGuppyScreen;
