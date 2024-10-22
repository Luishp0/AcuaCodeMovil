import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import tw from 'twrnc'; // Tailwind para estilos rápidos
import Navbar from "../assets/NavBar";

const CalendarScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Eventos de ejemplo
  const events = [
    { time: "08:00 am", title: "Alimentación", description: "¡Vamos!", color: "#A5D6A7" },
    { time: "09:45 am", title: "Mantenimiento", description: "Toca checar la pecera", color: "#FFCCBC" },
    { time: "10:50 am", title: "Nivel de pH alto", description: "¡Atención!", color: "#EF9A9A" },
    { time: "02:40 pm", title: "Estadísticas", description: "Visualizar datos de la semana", color: "#CE93D8" },
  ];

  return (
    <View style={tw`flex-1 bg-white`}>
      <Navbar navigation={navigation} />

      {/* Hacemos que toda la vista sea desplazable */}
      <ScrollView style={tw`flex-1`} contentContainerStyle={tw`pb-6`}>

        {/* Calendario */}
        <View style={tw`p-4`}>
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, marked: true, selectedColor: "blue" },
            }}
            theme={{
              todayTextColor: "#00adf5",
              arrowColor: "black",
            }}
          />
        </View>

        {/* Eventos programados */}
        <View style={tw`mt-4 px-4`}>
          {events.map((event, index) => (
            <View key={index} style={[tw`mb-4 p-4 rounded-lg`, { backgroundColor: event.color }]}>
              <Text style={tw`text-gray-700 font-bold`}>{event.time}</Text>
              <Text style={tw`text-gray-900 text-lg font-semibold`}>{event.title}</Text>
              <Text style={tw`text-gray-600`}>{event.description}</Text>
            </View>
          ))}
        </View>
        
      </ScrollView>
    </View>
  );
};

export default CalendarScreen;

