import React, { useContext } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { SettingsContext } from '../assets/SettingsContext';
import tw from 'twrnc';

const SettingsScreen = () => {
  const { theme, toggleTheme, language, changeLanguage, notificationsEnabled, toggleNotifications } = useContext(SettingsContext);

  return (
    <ScrollView style={[tw`flex-1`, theme === 'dark' ? tw`bg-gray-800` : tw`bg-white`]}>
      {/* Título */}
      <View style={tw`p-4`}>
        <Text style={[tw`text-center text-xl font-bold`, theme === 'dark' ? tw`text-white` : tw`text-black`]}>Configuración</Text>
      </View>

      {/* Cambiar tema */}
      <View style={tw`p-4 flex-row justify-between items-center`}>
        <Text style={[tw`text-lg`, theme === 'dark' ? tw`text-white` : tw`text-black`]}>Tema oscuro</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={toggleTheme}
        />
      </View>

      {/* Cambiar idioma */}
      <View style={tw`p-4`}>
        <Text style={[tw`text-lg mb-4`, theme === 'dark' ? tw`text-white` : tw`text-black`]}>Cambiar idioma</Text>
        <TouchableOpacity
          onPress={() => changeLanguage('en')}
          style={tw`mb-4 p-4 bg-blue-500 rounded-lg`}
        >
          <Text style={tw`text-white text-center`}>Inglés</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => changeLanguage('es')}
          style={tw`mb-4 p-4 bg-blue-500 rounded-lg`}
        >
          <Text style={tw`text-white text-center`}>Español</Text>
        </TouchableOpacity>
      </View>

      {/* Silenciar notificaciones */}
      <View style={tw`p-4 flex-row justify-between items-center`}>
        <Text style={[tw`text-lg`, theme === 'dark' ? tw`text-white` : tw`text-black`]}>Silenciar notificaciones</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
