import React, { useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import tw from 'twrnc';
import { SettingsContext } from '../assets/SettingsContext';

const RegisterPecesScreen = () => {
  const { theme, registeredPeces } = useContext(SettingsContext);
  const isDarkMode = theme === 'dark';

  return (
    <FlatList
      style={[tw`flex-1`, { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' }]} // Fondo dinámico
      contentContainerStyle={tw`p-6`} // Padding de contenido
      data={registeredPeces} // Datos de peces registrados
      keyExtractor={(item) => item.id} // Clave única para cada elemento
      ListHeaderComponent={(
        <Text
          style={[
            tw`text-xl font-bold mb-6`,
            { color: isDarkMode ? '#FFFFFF' : '#000000' },
          ]}
        >
          Peces Registrados
        </Text>
      )}
      ListEmptyComponent={(
        <Text
          style={[
            tw`text-center mb-8`,
            { color: isDarkMode ? '#B0BEC5' : '#6B7280' },
          ]}
        >
          Aún no cuentas con registros
        </Text>
      )}
      renderItem={({ item }) => (
        <View
          style={[
            tw`flex-row items-center mb-4`,
            {
              borderBottomWidth: 1,
              borderColor: isDarkMode ? '#374151' : '#E5E7EB',
            },
          ]}
        >
          <Text
            style={[
              tw`text-lg`,
              { color: isDarkMode ? '#FFFFFF' : '#000000' },
            ]}
          >
            {item.name}
          </Text>
        </View>
      )}
    />
  );
};

export default RegisterPecesScreen;
