import React, { createContext, useState } from 'react';

// Creamos el contexto
export const SettingsContext = createContext();

// Proveedor del contexto
export const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // O 'dark' dependiendo del valor predeterminado
  const [language, setLanguage] = useState('es'); // Idioma predeterminado
  const [notificationsEnabled, setNotificationsEnabled] = useState(true); // Notificaciones habilitadas por defecto

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

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
