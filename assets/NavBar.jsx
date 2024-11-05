import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import NavbarIcon from "../icons/NavbarIcon.png"; // Import the toggle icon

const Navbar = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(true); // State to control navbar visibility

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View>
      {/* Toggle Button */}
      <TouchableOpacity onPress={() => setIsVisible(!isVisible)} style={tw`p-4`}>
        <Image 
          source={NavbarIcon} 
          style={{ width: 24, height: 24 }} // Directly set width and height here
          resizeMode="contain"
        />
      </TouchableOpacity>

      {isVisible && (
        <View style={tw`bg-gray-800 p-4`}>
          {/* Navbar Menu */}
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

          {/* Settings Section */}
          <View style={tw`mb-4 border-t border-gray-600 pt-4`}>
            <TouchableOpacity onPress={() => handleNavigate('Settings')} style={tw`flex-row items-center mb-4`}>
              <Text style={tw`text-white text-lg font-bold`}>Configuración</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleNavigate('Login')} style={tw`flex-row items-center`}>
              <Text style={tw`text-red-400 text-lg font-bold`}>Salir</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Navbar;
