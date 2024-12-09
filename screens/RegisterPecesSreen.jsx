import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';
import { SettingsContext } from '../assets/SettingsContext';

const RegisterPecesScreen = ({ navigation }) => {
  const { theme, registeredPeces, setRegisteredPeces } = useContext(SettingsContext); // Contexto con peces registrados
  const isDarkMode = theme === 'dark';

  // Eliminar un pez
  const handleDelete = (id) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este pez?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: () => {
            const updatedPeces = registeredPeces.filter((pez) => pez.id !== id);
            setRegisteredPeces(updatedPeces); // Actualizar lista de peces
            Alert.alert('Éxito', 'El pez ha sido eliminado.');
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View
      style={[
        tw`flex-1`,
        { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' },
      ]}
    >
      <FlatList
        style={tw`flex-1`}
        contentContainerStyle={tw`p-6`}
        data={registeredPeces}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <Text
            style={[
              tw`text-xl font-bold mb-6`,
              { color: isDarkMode ? '#FFFFFF' : '#000000' },
            ]}
          >
            Peces Registrados
          </Text>
        }
        ListEmptyComponent={
          <Text
            style={[
              tw`text-center mb-8`,
              { color: isDarkMode ? '#B0BEC5' : '#6B7280' },
            ]}
          >
            Aún no cuentas con registros
          </Text>
        }
        renderItem={({ item }) => (
          <View
            style={[
              tw`flex-row items-center justify-between mb-4`,
              {
                borderBottomWidth: 1,
                borderColor: isDarkMode ? '#374151' : '#E5E7EB',
              },
            ]}
          >
            {/* Nombre del pez */}
            <TouchableOpacity
              onPress={() => navigation.navigate('Information', { pez: item })}
            >
              <Text
                style={[
                  tw`text-lg`,
                  { color: isDarkMode ? '#FFFFFF' : '#000000' },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>

            {/* Botón de eliminar */}
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Icon
                name="trash-outline"
                size={24}
                color={isDarkMode ? '#EF4444' : '#DC2626'}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default RegisterPecesScreen;
