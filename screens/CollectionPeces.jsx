import React, { useContext, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, Alert, Modal } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons'; // Importa los íconos
import { SettingsContext } from '../assets/SettingsContext';
import Guppy from '../img/Guppy.jpg';
import CosmicBlue from '../img/CosmicBlue.png';
import Betta from '../img/Betta.png';
import Platy from '../img/Platy.png';

const CollectionPeces = ({ navigation }) => {
  const { theme, addPez } = useContext(SettingsContext); // Usamos `addPez` del contexto
  const isDarkMode = theme === 'dark';

  const peces = [
    { id: '1', name: 'Guppy', image: Guppy, route: 'InformationGuppy' },
    { id: '2', name: 'Cosmic Blue', image: CosmicBlue, route: 'InformationCosmicBlue' },
    { id: '3', name: 'Betta', image: Betta, route: 'InformationBetta' },
    { id: '4', name: 'Platy', image: Platy, route: 'InformationPlaty' },
  ];

  const [searchText, setSearchText] = useState(''); // Estado para el texto de búsqueda
  const [filteredPeces, setFilteredPeces] = useState(peces); // Lista filtrada
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado del modal
  const [customName, setCustomName] = useState(''); // Estado para el nombre personalizado
  const [selectedPez, setSelectedPez] = useState(null); // Estado del pez seleccionado

  // Filtrar peces en base al texto de búsqueda
  const handleSearch = (text) => {
    setSearchText(text);
    if (text === '') {
      setFilteredPeces(peces);
    } else {
      const filtered = peces.filter((pez) =>
        pez.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPeces(filtered);
    }
  };

  // Manejar la adición del pez
  const handleAddPez = () => {
    if (customName.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa un nombre.');
      return;
    }

    addPez({
      id: selectedPez.id,
      name: `${selectedPez.name} - ${customName}`,
    });

    setIsModalVisible(false);
    setCustomName('');
    Alert.alert('Éxito', 'El pez ha sido registrado.');
  };

  return (
    <View
      style={[
        tw`flex-1 p-4`,
        { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' },
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
          onChangeText={handleSearch}
        />
      </View>

      {/* Lista de peces */}
      <FlatList
        data={filteredPeces}
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
                style={[tw`w-full h-40 rounded-lg`, { resizeMode: 'cover' }]}
              />

              {/* Botón de agregar */}
              <TouchableOpacity
                style={[tw`absolute top-2 right-2 w-10 h-10 rounded-full items-center justify-center`, {
                  backgroundColor: '#36B3DA',
                }]}
                onPress={() => {
                  setSelectedPez(item);
                  setIsModalVisible(true);
                }}
              >
                <Icon name="add" size={24} color="#FFFFFF" />
              </TouchableOpacity>

              {/* Botón de redirección */}
              <TouchableOpacity
                style={[tw`absolute bottom-2 right-2 w-10 h-10 rounded-full items-center justify-center`, {
                  backgroundColor: '#4CAF50',
                }]}
                onPress={() => navigation.navigate(item.route)}
              >
                <Icon name="arrow-forward" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Información del pez */}
            <View style={tw`flex-row items-center justify-between px-4 py-3`}>
              <Text
                style={[tw`text-lg font-bold`, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}
              >
                {item.name}
              </Text>
            </View>
          </View>
        )}
      />

      {/* Modal para asignar nombre */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View
          style={[
            tw`flex-1 justify-center items-center`,
            { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          ]}
        >
          <View
            style={[
              tw`w-11/12 p-6 rounded-lg`,
              { backgroundColor: isDarkMode ? '#374151' : '#FFFFFF' },
            ]}
          >
            <Text
              style={[tw`text-lg font-bold mb-4`, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}
            >
              Asignar nombre al pez
            </Text>
            <TextInput
              placeholder="Escribe el nombre del pez"
              placeholderTextColor={isDarkMode ? '#B0BEC5' : '#6B7280'}
              style={[
                tw`w-full px-4 py-2 rounded-lg mb-4`,
                {
                  backgroundColor: isDarkMode ? '#1F2937' : '#F3F4F6',
                  color: isDarkMode ? '#FFFFFF' : '#000000',
                },
              ]}
              value={customName}
              onChangeText={(text) => setCustomName(text)}
            />
            <View style={tw`flex-row justify-between`}>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={[tw`px-6 py-3 rounded-lg`, { backgroundColor: '#B0BEC5' }]}
              >
                <Text style={tw`text-white font-bold text-lg`}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAddPez}
                style={[tw`px-6 py-3 rounded-lg`, { backgroundColor: '#36B3DA' }]}
              >
                <Text style={tw`text-white font-bold text-lg`}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CollectionPeces;
