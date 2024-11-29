import React, { useContext, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons'; // Importa los íconos
import { SettingsContext } from '../assets/SettingsContext';
import Guppy from '../img/Guppy.jpg';
import CosmicBlue from '../img/CosmicBlue.png';
import Betta from '../img/Betta.png';
import Platy from '../img/Platy.png';

const CollectionPeces = ({ navigation }) => {
  const { theme } = useContext(SettingsContext); // Obtenemos el tema actual
  const isDarkMode = theme === 'dark';

  const peces = [
    { id: '1', name: 'Guppy', image: Guppy },
    { id: '2', name: 'Cosmic Blue', image: CosmicBlue },
    { id: '3', name: 'Betta', image: Betta },
    { id: '4', name: 'Platy', image: Platy },
  ];

  const [searchText, setSearchText] = useState(''); // Estado para el texto de búsqueda
  const [filteredPeces, setFilteredPeces] = useState(peces); // Lista filtrada

  // Filtrar peces en base al texto de búsqueda
  const handleSearch = (text) => {
    setSearchText(text); // Actualizar el texto del buscador
    if (text === '') {
      setFilteredPeces(peces); // Mostrar todos los peces si no hay texto
    } else {
      const filtered = peces.filter((pez) =>
        pez.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPeces(filtered); // Actualizar la lista filtrada
    }
  };

  return (
    <View
      style={[
        tw`flex-1 p-4`,
        { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' }, // Fondo dinámico
      ]}
    >
      {/* Header */}
      <View style={tw`flex-row items-center mb-4`}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={tw`flex-row items-center`}>
          <Icon name="arrow-back" size={24} color={isDarkMode ? '#60A5FA' : '#1E3A8A'} />
          <Text style={[tw`text-lg ml-2`, { color: isDarkMode ? '#60A5FA' : '#1E3A8A' }]}>
            Regresar
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={[tw`text-2xl font-bold`, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
        Peces
      </Text>

      {/* Barra de búsqueda */}
      <View
        style={[
          tw`w-full flex-row items-center px-4 py-2 rounded-lg mb-4`,
          {
            backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
            borderColor: isDarkMode ? '#4B5563' : '#E5E7EB',
            borderWidth: 1,
          },
        ]}
      >
        <Icon name="search" size={28} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
        <TextInput
          style={[tw`flex-1 ml-2`, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}
          placeholder="Buscar"
          placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
          value={searchText}
          onChangeText={handleSearch} // Manejar el texto de búsqueda
        />
      </View>

      {/* Lista de peces */}
      <FlatList
        data={filteredPeces} // Usar la lista filtrada
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              tw`rounded-lg overflow-hidden mb-4`,
              {
                backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
                shadowColor: isDarkMode ? '#000000' : '#000',
                shadowOpacity: 0.1,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 2 },
              },
            ]}
          >
            {/* Imagen del pez */}
            <View style={tw`relative`}>
              <Image
                source={item.image}
                style={[tw`w-full h-40 rounded-lg`, { resizeMode: 'cover' }]} // Imágenes más grandes
              />

              {/* Botón de agregar dentro de la imagen */}
              <TouchableOpacity
                style={[
                  tw`absolute top-2 right-2 w-10 h-10 rounded-full items-center justify-center`,
                  { backgroundColor: '#36B3DA' },
                ]}
              >
                <Icon name="add" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Información del pez */}
            <View style={tw`flex-row items-center justify-between px-4 py-3`}>
              <Text
                style={[
                  tw`text-lg font-bold`,
                  { color: isDarkMode ? '#FFFFFF' : '#000000' },
                ]}
              >
                {item.name}
              </Text>

              {/* Botón de detalle */}
              <TouchableOpacity
                style={[
                  tw`w-10 h-10 rounded-full items-center justify-center`,
                  {
                    borderColor: '#36B3DA',
                    borderWidth: 2,
                    backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                  },
                ]}
              >
                <Icon name="arrow-forward" size={24} color={isDarkMode ? '#60A5FA' : '#1E3A8A'} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default CollectionPeces;
