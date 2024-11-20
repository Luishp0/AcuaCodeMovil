import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator, // Importar ActivityIndicator
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import Logo from "../icons/logotra.png";
import { SettingsContext } from '../assets/SettingsContext';

const apiUrl = Config.API_URL;

const RegisterScreen = ({ navigation }) => {
  const { theme } = useContext(SettingsContext);
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false); // Estado para el indicador de carga

  const validateInputs = () => {
    if (!nombre.trim()) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return false;
    }
    if (!fechaNacimiento.trim()) {
      Alert.alert('Error', 'La fecha de nacimiento es obligatoria');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo.trim())) {
      Alert.alert('Error', 'Por favor, introduce un correo válido');
      return false;
    }
    if (!telefono.trim() || !/^\d{10}$/.test(telefono.trim())) {
      Alert.alert('Error', 'El teléfono debe ser un número de 10 dígitos');
      return false;
    }
    if (contrasena.trim().length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    setLoading(true); // Activar indicador de carga

    try {
      const response = await fetch(`${apiUrl}usuario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          fechaNacimiento,
          correo,
          telefono,
          contrasena,
        }),
      });
      const result = await response.json();

      if (response.ok) {
        Alert.alert('Usuario registrado exitosamente!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error al registrar usuario:', result.message || 'Inténtalo nuevamente.');
      }
    } catch (error) {
      Alert.alert('Error de conexión:', error.message);
    }finally {
      setLoading(false); // Desactivar indicador de carga
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Cierra el selector de fechas
    if (selectedDate) {
      const today = new Date();
      const birthDate = new Date(selectedDate);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
  
      // Ajusta la edad si el mes o día aún no han pasado este año
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
  
      if (age < 13) {
        Alert.alert('Error', 'Debes tener al menos 13 años para registrarte');
        setFechaNacimiento(''); // Resetea la fecha si no cumple con el requisito
      } else {
        const date = birthDate.toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
        setFechaNacimiento(date); // Establece la fecha seleccionada en el estado
      }
    }
  };
  
  

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={[
            tw`flex-1 justify-center px-4`,
            theme === 'dark' ? tw`bg-gray-900` : tw`bg-white`,
          ]}
        >
          {/* Indicador de carga */}
          {loading && (
            <View
              style={[
                tw`absolute inset-0 justify-center items-center`,
                { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 10 },
              ]}
            >
              <ActivityIndicator size="large" color="#0CC0DF" />
            </View>
          )}

          {/* Botón de Regresar */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`absolute top-4 left-4 flex-row items-center`}
          >
            <Icon name="arrow-back" size={24} color={theme === 'dark' ? '#FFF' : '#000'} />
            <Text
              style={[
                tw`ml-2 text-xl font-medium`,
                theme === 'dark' ? tw`text-white` : tw`text-black`,
              ]}
            >
              Regresar
            </Text>
          </TouchableOpacity>

          {/* Logo */}
          <Image source={Logo} style={tw`w-24 h-24 mx-auto mb-6`} />

          <Text
            style={[
              tw`text-3xl font-bold text-center mb-6`,
              theme === 'dark' ? tw`text-white` : tw`text-black`,
            ]}
          >
            Registrarse
          </Text>

          {/* Input de Nombre */}
          <View
            style={[
              styles.inputContainer,
              theme === 'dark' ? styles.darkInput : styles.lightInput,
            ]}
          >
            <Icon name="person" size={24} color={theme === 'dark' ? '#FFF' : '#000'} style={styles.icon} />
            <TextInput
              placeholder="Nombre Completo"
              placeholderTextColor={theme === 'dark' ? '#AAA' : '#555'}
              style={[
                styles.input,
                theme === 'dark' ? { color: '#FFF' } : { color: '#000' },
              ]}
              value={nombre}
              onChangeText={setNombre}
            />
          </View>

          {/* Input de Fecha de Nacimiento */}
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <View
              style={[
                styles.inputContainer,
                theme === 'dark' ? styles.darkInput : styles.lightInput,
              ]}
            >
              <Icon name="calendar" size={24} color={theme === 'dark' ? '#FFF' : '#000'} style={styles.icon} />
              <TextInput
                placeholder="Fecha de Nacimiento"
                placeholderTextColor={theme === 'dark' ? '#AAA' : '#555'}
                style={[
                  styles.input,
                  theme === 'dark' ? { color: '#FFF' } : { color: '#000' },
                ]}
                value={fechaNacimiento}
                editable={false}
              />
            </View>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
            />
          )}

          {/* Input de Teléfono */}
          <View
            style={[
              styles.inputContainer,
              theme === 'dark' ? styles.darkInput : styles.lightInput,
            ]}
          >
            <Icon name="call" size={24} color={theme === 'dark' ? '#FFF' : '#000'} style={styles.icon} />
            <TextInput
              placeholder="Teléfono"
              placeholderTextColor={theme === 'dark' ? '#AAA' : '#555'}
              style={[
                styles.input,
                theme === 'dark' ? { color: '#FFF' } : { color: '#000' },
              ]}
              keyboardType="numeric"
              value={telefono}
              onChangeText={(text) => {
                if (/^\d*$/.test(text) && text.length <= 10) {
                  setTelefono(text);
                }
              }}
            />
          </View>

          {/* Input de Correo */}
          <View
            style={[
              styles.inputContainer,
              theme === 'dark' ? styles.darkInput : styles.lightInput,
            ]}
          >
            <Icon name="mail" size={24} color={theme === 'dark' ? '#FFF' : '#000'} style={styles.icon} />
            <TextInput
              placeholder="Correo Electrónico"
              placeholderTextColor={theme === 'dark' ? '#AAA' : '#555'}
              style={[
                styles.input,
                theme === 'dark' ? { color: '#FFF' } : { color: '#000' },
              ]}
              keyboardType="email-address"
              value={correo}
              onChangeText={setCorreo}
            />
          </View>

          {/* Input de Contraseña */}
          <View
            style={[
              styles.inputContainer,
              theme === 'dark' ? styles.darkInput : styles.lightInput,
            ]}
          >
            <Icon name="lock-closed" size={24} color={theme === 'dark' ? '#FFF' : '#000'} style={styles.icon} />
            <TextInput
              placeholder="Contraseña"
              placeholderTextColor={theme === 'dark' ? '#AAA' : '#555'}
              style={[
                styles.input,
                theme === 'dark' ? { color: '#FFF' } : { color: '#000' },
              ]}
              secureTextEntry={!showPassword}
              value={contrasena}
              onChangeText={setContrasena}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? "eye" : "eye-off"}
                size={24}
                color={theme === 'dark' ? '#FFF' : '#000'}
              />
            </TouchableOpacity>
          </View>

          {/* Botón de Registrar */}
          <TouchableOpacity
            onPress={handleRegister}
            style={[tw`p-4 mb-4 rounded-lg`, 
              { 
                backgroundColor: theme === 'dark' ? '#064E66' : '#0CC0DF', // Color para modo oscuro y claro
              }
              ]}
          >
            <Text style={tw`text-center text-white font-bold text-xl`}>Registrar</Text>
          </TouchableOpacity>

          {/* Términos y condiciones */}
          <View style={tw`flex-row justify-center mb-4`}>
            <TouchableOpacity>
              <Text style={[tw`text-5x1 font-semibold`, { color: '#3D9FB3' }]}>
                Política de privacidad
              </Text>
            </TouchableOpacity>
            <Text style={tw`mx-2 text-lg text-gray-500`}>|</Text>
            <TouchableOpacity>
              <Text style={[tw`text-5x1 font-semibold`, { color: '#3D9FB3' }]}>
                Términos de uso
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 12,
  },
  darkInput: {
    backgroundColor: '#374151',
    borderColor: '#4B5563',
  },
  lightInput: {
    backgroundColor: '#F3F4F6',
    borderColor: '#D1D5DB',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});

export default RegisterScreen;
