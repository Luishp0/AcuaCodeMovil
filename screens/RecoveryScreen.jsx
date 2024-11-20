import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator, // Importar el componente de carga
} from 'react-native';
import { SettingsContext } from '../assets/SettingsContext';
import tw from 'twrnc';
import RecuperacionBlanca from '../icons/RecuperacionBlanca.png';
import RecuperacionNegra from '../icons/RecuperacionNegra.png';
import Icon from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';

const apiUrl = Config.API_URL;

const RecoveryScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // Estado para el indicador de carga
  const { theme } = useContext(SettingsContext);

  const handlePasswordReset = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido.');
      return;
    }

    setLoading(true); // Activar indicador de carga

    try {
      const response = await fetch(`${apiUrl}usuario/enviarcorreo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: email }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Enlace de recuperación enviado', `Revisa tu correo ${email}`);
        navigation.navigate('Verification', { email });
      } else {
        Alert.alert('Error', result.message || 'No se pudo enviar el enlace de recuperación');
      }
    } catch (error) {
      Alert.alert('Error de conexión', error.message);
    } finally {
      setLoading(false); // Desactivar indicador de carga
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <View style={[tw`flex-1`, theme === 'dark' ? tw`bg-gray-800` : tw`bg-white`]}>
        {/* Indicador de carga */}
        {loading && (
          <View
            style={[
              tw`absolute inset-0 justify-center items-center`,
              { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 10 },
            ]}
          >
           <ActivityIndicator size="large" color="#0CC0DF" accessible={true} accessibilityLabel="Cargando" />

          </View>
        )}

        {/* Barra superior */}
        <View style={tw`flex-row items-center px-4 mt-5`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-back"
              size={28}
              color={theme === 'dark' ? 'white' : 'black'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text
              style={[
                tw`text-lg font-semibold ml-3`,
                theme === 'dark' ? tw`text-white` : tw`text-black`,
              ]}
            >
              Regresar
            </Text>
          </TouchableOpacity>
        </View>

        {/* Contenido desplazable */}
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          {/* Logo */}
          <View style={tw`items-center mt-10`}>
            <Image
              source={theme === 'dark' ? RecuperacionNegra : RecuperacionBlanca}
              style={{ width: 400, height: 300, resizeMode: 'contain' }}
            />
          </View>

          {/* Título y descripción */}
          <View style={tw`px-4 mt-5`}>
            <Text
              style={[
                tw`text-3xl font-bold text-center`,
                theme === 'dark' ? tw`text-white` : tw`text-black`,
              ]}
            >
              Recuperación de contraseña
            </Text>
            <Text
              style={[
                tw`text-lg text-center mt-2`,
                theme === 'dark' ? tw`text-gray-300` : tw`text-gray-600`,
              ]}
            >
              Ingresa tu correo electrónico para recuperar tu contraseña
            </Text>
          </View>

          {/* Campo de correo electrónico */}
          <View style={tw`px-4 mt-5`}>
            <View
              style={[
                tw`flex-row items-center border rounded-lg`,
                { height: 59 },
                theme === 'dark' ? tw`bg-gray-700 border-gray-600` : tw`bg-gray-100 border-gray-300`,
              ]}
            >
              <Icon
                name="mail"
                size={28}
                color={theme === 'dark' ? 'white' : 'black'}
                style={[tw`ml-4 mr-3`]}
              />
              <TextInput
                placeholder="Correo Electrónico"
                placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
                style={[
                  tw`flex-1 text-lg`,
                  { paddingVertical: 0 },
                  theme === 'dark' ? tw`text-white` : tw`text-black`,
                ]}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Botón de recuperación */}
          <View style={tw`px-4 mt-6`}>
            <TouchableOpacity
              style={[
                tw`py-4 rounded-lg`,
                { 
                  backgroundColor: theme === 'dark' ? '#064E66' : '#0CC0DF', // Color para modo oscuro y claro
                },
              ]}
              onPress={handlePasswordReset}
              disabled={loading} // Deshabilitar botón mientras carga
            >
              <Text
                style={[
                  tw`text-center text-lg font-bold`,
                  { color: '#FFFFFF' },
                ]}
              >
                Recuperar Contraseña
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RecoveryScreen;
