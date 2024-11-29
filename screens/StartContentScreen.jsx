import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'twrnc';
import { SettingsContext } from '../assets/SettingsContext';

const StartContentScreen = () => {
  const { theme } = useContext(SettingsContext);

  const isDarkMode = theme === 'dark';

  return (
    <View
      style={[
        tw`flex-1`,
        { backgroundColor: isDarkMode ? '#121212' : '#FFFFFF' }, // Fondo según el tema
      ]}
    >
      {/* Contenedor principal */}
      <LinearGradient
        colors={['#3D84A7', '#36B3DA', '#00A6F7']} // Colores del degradado
        style={[
          tw`w-11/12 self-center p-6 rounded-lg mt-10 flex-row justify-between items-center`,
          {
            borderRadius: 12,
            shadowColor: isDarkMode ? '#000000' : '#000',
            shadowOpacity: 0.1,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 2 },
          },
        ]}
      >
        {/* Contenedor del texto (izquierda) */}
        <View style={tw`flex-1`}>
          <Text
            style={[
              tw`text-2xl font-bold mb-2`,
              { color: '#FFFFFF' },
            ]}
          >
            AcuaCode
          </Text>
          <Text
            style={[
              tw`text-base mb-2`,
              { color: '#FFFFFF' },
            ]}
          >
            Condición de la pecera:
          </Text>
          <Text
            style={[
              tw`text-sm`,
              { color: '#FFFFFF' },
            ]}
          >
            La pecera se encuentra en excelentes condiciones.
          </Text>
        </View>

        {/* Indicador semicircular (derecha) */}
        <View
          style={{
            width: 150,
            height: 75,
            borderTopLeftRadius: 75,
            borderTopRightRadius: 75,
            backgroundColor: isDarkMode ? '#37474F' : '#FFFFFF', // Indicador según el tema
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: isDarkMode ? '#00A6F7' : '#3D84A7',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            100%
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default StartContentScreen;
