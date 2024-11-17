import React, { useState, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import tw from 'twrnc';
import { SettingsContext } from '../assets/SettingsContext';
import Icon from 'react-native-vector-icons/Ionicons';

const Navbar = ({ navigation }) => {
  const { theme } = useContext(SettingsContext);
  const [isVisible, setIsVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-250)).current;

  const toggleNavbar = () => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: -250,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsVisible(false));
    } else {
      setIsVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
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
        <Icon
          name={isVisible ? "close" : "menu"}
          size={32}
          color={theme === 'dark' ? 'white' : 'black'}
        />
      </TouchableOpacity>

      {/* Icono de la campana */}
      <TouchableOpacity
        onPress={() => handleNavigate('Notifications')}
        style={[tw`absolute top-4 right-4 p-2`, { zIndex: 3 }]}
      >
        <Icon
          name="notifications"
          size={32}
          color={theme === 'dark' ? 'white' : 'black'}
        />
      </TouchableOpacity>

      {/* Fondo semitransparente */}
      {isVisible && (
        <TouchableOpacity
          style={[
            tw`absolute top-0 left-0 right-0 bottom-0`,
            { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 },
          ]}
          activeOpacity={1}
          onPress={toggleNavbar}
        />
      )}

      {/* Navbar Desplegable */}
      {isVisible && (
        <Animated.View
          style={[
            tw`p-4`,
            {
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              transform: [{ translateX: slideAnim }],
              width: '50%',
              zIndex: 2,
              backgroundColor: theme === 'dark' ? '#303030' : '#ffffff',
            },
          ]}
        >
          {/* Menú Principal */}
          <View style={tw`flex-1`}>
            <TouchableOpacity
              onPress={() => handleNavigate('Home')}
              style={tw`flex-row items-center mb-6`}
            >
              <Icon name="home" size={24} color={theme === 'dark' ? 'white' : 'black'} />
              <Text
                style={[
                  tw`ml-4 text-xl font-bold`,
                  theme === 'dark' ? tw`text-white` : tw`text-black`,
                ]}
              >
                Inicio
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleNavigate('UpdateUser')}
              style={tw`flex-row items-center mb-6`}
            >
              <Icon name="person" size={24} color={theme === 'dark' ? 'white' : 'black'} />
              <Text
                style={[
                  tw`ml-4 text-xl font-bold`,
                  theme === 'dark' ? tw`text-white` : tw`text-black`,
                ]}
              >
                Perfil
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleNavigate('Substances')}
              style={tw`flex-row items-center mb-6`}
            >
              <Icon name="flask" size={24} color={theme === 'dark' ? 'white' : 'black'} />
              <Text
                style={[
                  tw`ml-4 text-xl font-bold`,
                  theme === 'dark' ? tw`text-white` : tw`text-black`,
                ]}
              >
                Sustancias
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleNavigate('Calendar')}
              style={tw`flex-row items-center`}
            >
              <Icon name="calendar" size={24} color={theme === 'dark' ? 'white' : 'black'} />
              <Text
                style={[
                  tw`ml-4 text-xl font-bold`,
                  theme === 'dark' ? tw`text-white` : tw`text-black`,
                ]}
              >
                Calendario
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sección de Configuración y Salir al final */}
          <View style={tw`mb-6 border-t pt-4 ${theme === 'dark' ? 'border-gray-500' : 'border-gray-300'}`}>
            <TouchableOpacity
              onPress={() => handleNavigate('Settings')}
              style={tw`flex-row items-center mb-6`}
            >
              <Icon name="settings" size={24} color={theme === 'dark' ? 'white' : 'black'} />
              <Text
                style={[
                  tw`ml-4 text-xl font-bold`,
                  theme === 'dark' ? tw`text-white` : tw`text-black`,
                ]}
              >
                Configuración
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleNavigate('Login')}
              style={tw`flex-row items-center`}
            >
              <Icon name="log-out" size={24} color={theme === 'dark' ? '#FF6B6B' : '#FF3B30'} />
              <Text
                style={[
                  tw`ml-4 text-xl font-bold`,
                  theme === 'dark' ? tw`text-red-300` : tw`text-red-500`,
                ]}
              >
                Salir
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </>
  );
};

export default Navbar;
