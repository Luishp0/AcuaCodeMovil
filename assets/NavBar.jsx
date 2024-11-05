import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import tw from 'twrnc';
import NavbarIcon from "../icons/NavbarIcon.png"; // Importa el icono de toggle

const Navbar = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false); // Estado para controlar la visibilidad del navbar
  const slideAnim = useRef(new Animated.Value(-250)).current; // Valor inicial fuera de la pantalla

  const toggleNavbar = () => {
    if (isVisible) {
      // Animación para ocultar el navbar
      Animated.timing(slideAnim, {
        toValue: -250, // Posición fuera de la pantalla
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsVisible(false));
    } else {
      setIsVisible(true);
      // Animación para mostrar el navbar
      Animated.timing(slideAnim, {
        toValue: 0, // Posición en la pantalla
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Botón para Toggle */}
      <TouchableOpacity onPress={toggleNavbar} style={tw`p-4`}>
        <Image 
          source={NavbarIcon} 
          style={{ width: 24, height: 24 }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Navbar Desplegable */}
      {isVisible && (
        <Animated.View style={[tw`bg-gray-800 p-4`, { 
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          transform: [{ translateX: slideAnim }],
          width: 250 // Ajusta el ancho del navbar
        }]}>
          {/* Menú Principal */}
          <View style={tw`mb-4`}>
            <TouchableOpacity onPress={() => handleNavigate('Home')} style={tw`flex-row items-center mb-4`}>
              <Text style={tw`text-white text-lg font-bold`}>Inicio</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigate('UpdateUser')} style={tw`flex-row items-center mb-4`}>
              <Text style={tw`text-white text-lg font-bold`}>Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigate('Substances')} style={tw`flex-row items-center mb-4`}>
              <Text style={tw`text-white text-lg font-bold`}>Sustancias</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigate('Calendar')} style={tw`flex-row items-center mb-4`}>
              <Text style={tw`text-white text-lg font-bold`}>Calendario</Text>
            </TouchableOpacity>
          </View>

          {/* Sección de Configuración */}
          <View style={tw`mb-4 border-t border-gray-600 pt-4`}>
            <TouchableOpacity onPress={() => handleNavigate('Settings')} style={tw`flex-row items-center mb-4`}>
              <Text style={tw`text-white text-lg font-bold`}>Configuración</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigate('Login')} style={tw`flex-row items-center`}>
              <Text style={tw`text-red-400 text-lg font-bold`}>Salir</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default Navbar;
