import React from 'react';
import { View, Text, Button } from 'react-native';
import tw from 'twrnc';

const HomeScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Navegar a la pantalla de Login
    navigation.navigate('Login');
  };

  return (
    <View style={tw`flex-1 justify-center items-center px-4`}>
      <Text style={tw`text-3xl font-bold text-center mb-5`}>Bienvenido a la App!</Text>
      <Text style={tw`text-lg text-center mb-5`}>
        Aquí puedes ver la información y navegar a otras secciones de la aplicación.
      </Text>
      <Button title="Actualizar Información" onPress={() => navigation.navigate('UpdateUser')} />
      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
