import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native'; // Asegúrate de importar useColorScheme

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const systemTheme = useColorScheme(); // Detecta el tema del sistema (light/dark)
  const [theme, setTheme] = useState(systemTheme || 'light'); // Inicializa con el tema del sistema o 'light' por defecto
  const [language, setLanguage] = useState('es'); // Idioma inicial
  const [notificationsEnabled, setNotificationsEnabled] = useState(true); // Notificaciones habilitadas por defecto

  // Actualiza el tema cuando el sistema cambia entre claro y oscuro
  useEffect(() => {
    setTheme(systemTheme); // Sincroniza el tema con el sistema
  }, [systemTheme]);

  // Función para alternar manualmente entre los temas claro y oscuro
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Cambiar el idioma de la aplicación
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  // Alternar notificaciones
  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  return (
    <SettingsContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        changeLanguage,
        notificationsEnabled,
        toggleNotifications,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
