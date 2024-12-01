import React, { useContext } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons'; // Icono para el botón de regreso
import { SettingsContext } from '../assets/SettingsContext';

// Importación de imágenes
import Betta from '../img/Betta.png'; // Fondo principal
import BettaUno from '../img/Betta/BettaUno.png';
import BettaDos from '../img/Betta/BettaDos.png';
import BettaTres from '../img/Betta/BettaTres.png';
import BettaCuatro from '../img/Betta/BettaCuatro.png';
import BettaCinco from '../img/Betta/BettaCinco.png';

const { width } = Dimensions.get('window'); // Obtiene el ancho de la pantalla

const InformationBettaScreen = ({ navigation }) => {
  const { theme } = useContext(SettingsContext); // Contexto para el tema

  const textColor = theme === 'dark' ? tw`text-white` : tw`text-black`;

  const images = [BettaUno, BettaDos, BettaTres, BettaCuatro, BettaCinco];

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
          source={Betta}
          style={tw`w-full h-full`}
          resizeMode="cover"
        />
        {/* Botón de regreso */}
        <TouchableOpacity
          style={tw`absolute top-3 left-3 flex-row items-center`}
          onPress={() => navigation.navigate("CollectionPeces")}
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
          Betta
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
            { label: 'Temperatura', value: '25-30°C' },
            { label: 'pH', value: '6.0-7.5' },
            { label: 'Oxígeno', value: '3-6 mg/l' },
            { label: 'Dureza', value: '5-15 dGH' },
            { label: 'Nitritos', value: '0 ppm' },
            { label: 'Nitratos', value: '<20 ppm' },
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
          Los peces Betta necesitan una dieta rica en proteínas. Aliméntalos con alimentos vivos como larvas de mosquito, dafnias y artemias. También puedes usar alimentos en pellets o escamas diseñados específicamente para bettas. Evita sobrealimentarlos para prevenir problemas de salud.
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

export default InformationBettaScreen;
