import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'twrnc';
import InicioImagen from '../icons/inicioImagen.png'; // Ruta de tu imagen principal
import Logo from '../icons/logotra.png'; // Ruta del logo de AcuaCode
import { SettingsContext } from '../assets/SettingsContext'; // Contexto del tema (oscuro o claro)

const InicioScreen = ({ navigation }) => {
  const { theme } = useContext(SettingsContext); // Obtiene el tema actual (oscuro o claro)

  return (
    <View
      style={[
        tw`flex-1 justify-center items-center`,
        theme === 'dark' ? tw`bg-gray-900` : tw`bg-white`, // Fondo según el tema
      ]}
    >
      {/* Círculos decorativos */}
      <Image source={InicioImagen} style={styles.decorativeImage} />

      {/* Logo */}
      <Image source={Logo} style={styles.logo} />

      {/* Texto de bienvenida */}
      <Text
        style={[
          tw`text-4xl font-bold`,
          theme === 'dark' ? tw`text-white` : tw`text-black`, // Texto según el tema
        ]}
      >
        AcuaCode
      </Text>
      <Text
        style={[
          tw`text-xl mt-2`,
          theme === 'dark' ? tw`text-gray-300` : tw`text-gray-500`, // Texto según el tema
        ]}
      >
        ¡Bienvenido!
      </Text>

      {/* Botón de empezar */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')} // Redirige a la pantalla de login
        style={[
          styles.button,
          {
            backgroundColor: theme === 'dark' ? '#3A8FA3' : '#0CC0DF', // Color del botón según el tema
          },
        ]}
      >
        <Text style={tw`text-white text-lg font-bold`}>Empezar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  decorativeImage: {
    width: 400, // Tamaño más grande
    height: 400, // Tamaño más grande
    marginBottom: 20,
    resizeMode: 'contain',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 140,
    borderRadius: 12,
    marginTop: 30,
  },
});

export default InicioScreen;
