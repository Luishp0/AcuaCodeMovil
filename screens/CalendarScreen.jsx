import React, { useState, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import tw from "twrnc"; // Tailwind para estilos rápidos
import Navbar from "../assets/NavBar";
import { SettingsContext } from "../assets/SettingsContext";

const CalendarScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const { theme } = useContext(SettingsContext);

  // Eventos de ejemplo
  const events = [
    { time: "08:00 am", title: "Alimentación", description: "¡Vamos!", color: "#A5D6A7" },
    { time: "09:45 am", title: "Mantenimiento", description: "Toca checar la pecera", color: "#FFCCBC" },
    { time: "10:50 am", title: "Nivel de pH alto", description: "¡Atención!", color: "#EF9A9A" },
  ];

  return (
    <View
      style={[
        tw`flex-1`,
        theme === "dark" ? tw`bg-gray-800` : tw`bg-white`,
      ]}
    >
      <Navbar navigation={navigation} />

      {/* Hacemos que toda la vista sea desplazable */}
      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={tw`pb-6`}
      >
        <View style={tw`p-4`}>
          <Text
            style={[
              tw`text-center text-xl font-bold`,
              theme === "dark" ? tw`text-white` : tw`text-black`,
            ]}
          >
            Calendario
          </Text>
        </View>
        {/* Calendario */}
        <View style={tw`p-4`}>
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, marked: true, selectedColor: "blue" },
            }}
            theme={{
              backgroundColor: theme === "dark" ? "#303030" : "#ffffff",
              calendarBackground: theme === "dark" ? "#303030" : "#ffffff",
              textSectionTitleColor: theme === "dark" ? "#ffffff" : "#2d4150",
              selectedDayBackgroundColor: "#00adf5",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#00adf5",
              dayTextColor: theme === "dark" ? "#ffffff" : "#2d4150",
              textDisabledColor: theme === "dark" ? "#555555" : "#d9e1e8",
              dotColor: "#00adf5",
              arrowColor: theme === "dark" ? "#ffffff" : "#000000",
              monthTextColor: theme === "dark" ? "#ffffff" : "#2d4150",
            }}
          />
        </View>

        {/* Eventos programados */}
        <View style={tw`mt-4 px-4`}>
          {events.map((event, index) => (
            <View
              key={index}
              style={[
                tw`mb-4 p-4 rounded-lg`,
                theme === "dark"
                  ? { backgroundColor: event.color, opacity: 0.8 }
                  : { backgroundColor: event.color },
              ]}
            >
              <Text
                style={[
                  tw`font-bold`,
                  theme === "dark" ? tw`text-gray-200` : tw`text-gray-700`,
                ]}
              >
                {event.time}
              </Text>
              <Text
                style={[
                  tw`text-lg font-semibold`,
                  theme === "dark" ? tw`text-white` : tw`text-gray-900`,
                ]}
              >
                {event.title}
              </Text>
              <Text
                style={[
                  tw`text-sm`,
                  theme === "dark" ? tw`text-gray-400` : tw`text-gray-600`,
                ]}
              >
                {event.description}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CalendarScreen;
