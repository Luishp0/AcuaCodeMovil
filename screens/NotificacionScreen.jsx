import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import tw from 'twrnc';
import { SettingsContext } from '../assets/SettingsContext';
import Icon from 'react-native-vector-icons/Ionicons';

const NotificationScreen = ({ navigation }) => {
  const { theme } = useContext(SettingsContext);

  const notifications = [
    {
      id: 1,
      icon: 'restaurant-outline',
      color: 'green',
      message: 'Es hora de la comida para tus amigos acuáticos. ¡No dejes que se queden con hambre!',
    },
    {
      id: 2,
      icon: 'hammer-outline',
      color: 'orange',
      message: '¡Mantenimiento pendiente! Es hora de cambiar el agua.',
    },
    {
      id: 3,
      icon: 'thermometer-outline',
      color: 'red',
      message: '¡Atención! El nivel de pH está fuera de los límites aceptables. Toma medidas para corregirlo.',
    },
    {
      id: 4,
      icon: 'bar-chart-outline',
      color: 'purple',
      message: 'Nuevas estadísticas disponibles. Echa un vistazo a los cambios recientes en el ambiente de tu pecera.',
    },
  ];

  const markAsRead = () => {
    Alert.alert('Notificaciones', 'Notificaciones leídas', [{ text: 'OK' }]);
  };

  return (
    <View style={[tw`flex-1`, theme === 'dark' ? tw`bg-gray-800` : tw`bg-white`]}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between p-3`}>
        {/* Botón para regresar */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={tw`flex-row items-center`}
        >
          <Icon name="arrow-back" size={32} color={theme === 'dark' ? 'white' : 'black'} />
          <Text style={[tw`text-xl font-bold ml-2`, theme === 'dark' ? tw`text-white` : tw`text-black`]}>
            Regresar
          </Text>
        </TouchableOpacity>
        {/* Botón para marcar como leído */}
        <TouchableOpacity onPress={markAsRead}>
          <Icon name="checkmark-done-outline" size={32} color={theme === 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>
      </View>

      {/* Título */}
      <Text style={[tw`text-2xl font-bold px-4`, theme === 'dark' ? tw`text-white` : tw`text-black`]}>
        Notificaciones
      </Text>
      <Text style={[tw`text-base font-bold px-4 mt-2`, theme === 'dark' ? tw`text-gray-300` : tw`text-gray-700`]}>
        Hoy
      </Text>

      {/* Lista de notificaciones */}
      <ScrollView contentContainerStyle={tw`p-4`}>
        {notifications.map((notification) => (
          <View
            key={notification.id}
            style={[
              tw`flex-row items-center p-4 mb-4 rounded-lg shadow-sm`,
              theme === 'dark' ? tw`bg-gray-700` : tw`bg-gray-100`,
            ]}
          >
            {/* Icono con color */}
            <View
              style={[
                tw`w-14 h-14 rounded-full justify-center items-center`,
                { backgroundColor: `${notification.color}20` },
              ]}
            >
              <Icon name={notification.icon} size={32} color={notification.color} />
            </View>
            {/* Contenedor del texto */}
            <View style={tw`flex-1 ml-4`}>
              <Text
                style={[tw`text-lg`, theme === 'dark' ? tw`text-white` : tw`text-gray-800`]}
                numberOfLines={4}
              >
                {notification.message}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;
