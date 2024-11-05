import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import NavbarIcon from "../icons/NavbarIcon.png"; // Icono para abrir el navbar
import CampanaIcon from "../icons/CampanaIcon.png"; // Icono para la campana

const Header = ({ toggleNavbar }) => {
  return (
    <View style={tw`flex-row justify-between items-center p-4 bg-white`}>
      {/* Botón para abrir el navbar (izquierda) */}
      <TouchableOpacity onPress={toggleNavbar}>
        <Image 
          source={NavbarIcon} 
          style={{ width: 24, height: 24 }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Icono de la campana (derecha) */}
      <TouchableOpacity>
        <Image 
          source={CampanaIcon} 
          style={{ width: 24, height: 24 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
