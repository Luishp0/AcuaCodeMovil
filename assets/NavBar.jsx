import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import tw from 'twrnc';
import NavbarIcon from "../icons/NavbarIcon.png"; // Icono para abrir el navbar
import FlechaIcon from "../icons/FlechaIcon.png"; // Icono para cerrar el navbar
import CampanaIcon from "../icons/CampanaIcon.png"; // Icono de la campana

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
    <>
      {/* Botón para Toggle */}
      <TouchableOpacity onPress={toggleNavbar} style={tw`p-4`}>
        <Image 
          source={isVisible ? FlechaIcon : NavbarIcon} 
          style={{ width: 24, height: 24 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      
      {/* Icono de la campana en la esquina superior derecha */}
      <TouchableOpacity 
        onPress={() => handleNavigate('Notifications')}
        style={[
          tw`absolute top-4 right-4 p-2`, 
          { zIndex: 3 } // Asegura que el icono esté encima del navbar y otros elementos
        ]}
      >
        <Image 
          source={CampanaIcon} 
          style={{ width: 24, height: 24 }} 
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Fondo semitransparente */}
      {isVisible && (
        <TouchableOpacity
          style={[ 
            tw`absolute top-0 left-0 right-0 bottom-0`, 
            { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }, 
          ]}
          activeOpacity={1} // Para evitar que se cierre si se toca el fondo
          onPress={toggleNavbar} // Cierra el navbar al tocar el fondo
        />
      )}

      {/* Navbar Desplegable */}
      {isVisible && (
        <Animated.View style={[tw`bg-white p-4`, { 
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          transform: [{ translateX: slideAnim }],
          width: '50%', // Hace que el navbar ocupe la mitad de la pantalla
          zIndex: 2, // Asegura que el navbar esté encima del fondo semitransparente
        }]}>
          {/* Menú Principal */}
          <View style={tw`mb-4`}>
            <TouchableOpacity onPress={() => handleNavigate('Home')} style={tw`flex-row items-center mb-4`}>
              <Text style={tw`text-black text-lg font-bold`}>Inicio</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigate('UpdateUser')} style={tw`flex-row items-center mb-4`}>
              <Text style={tw`text-black text-lg font-bold`}>Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigate('Substances')} style={tw`flex-row items-center mb-4`}>
              <Text style={tw`text-black text-lg font-bold`}>Sustancias</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigate('Calendar')} style={tw`flex-row items-center mb-4`}>
              <Text style={tw`text-black text-lg font-bold`}>Calendario</Text>
            </TouchableOpacity>
          </View>

          {/* Sección de Configuración */}
          <View style={tw`mb-4 border-t border-gray-600 pt-4`}>
            <TouchableOpacity onPress={() => handleNavigate('Settings')} style={tw`flex-row items-center mb-4`}>
              <Text style={tw`text-black text-lg font-bold`}>Configuración</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigate('Login')} style={tw`flex-row items-center`}>
              <Text style={tw`text-red-400 text-lg font-bold`}>Salir</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </>
  );
};

export default Navbar;
