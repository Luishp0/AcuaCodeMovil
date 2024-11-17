import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import tw from "twrnc";
import Navbar from "../assets/NavBar";
import { SettingsContext } from "../assets/SettingsContext";

const screenWidth = Dimensions.get("window").width;

const SubstanceScreen = ({ navigation }) => {
  const { theme } = useContext(SettingsContext);

  // Datos del gráfico circular
  const chartData = [
    { name: "Cloro", population: 1, color: "#42A5F5", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "Nitrato", population: 2, color: "#66BB6A", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "Nitrito", population: 0.5, color: "#FFA726", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "Amoniaco", population: 1, color: "#EF5350", legendFontColor: "#7F7F7F", legendFontSize: 15 },
  ];

  return (
    <View style={[tw`flex-1`, theme === "dark" ? tw`bg-gray-800` : tw`bg-white`]}>
      {/* Navbar */}
      <Navbar navigation={navigation} />

      {/* Contenido desplazable */}
      <ScrollView style={tw`flex-1`} contentContainerStyle={tw`pb-10`}>
        {/* Título */}
        <View style={tw`p-4`}>
          <Text
            style={[
              tw`text-center text-xl font-bold`,
              theme === "dark" ? tw`text-white` : tw`text-black`,
            ]}
          >
            Sustancias del agua
          </Text>
        </View>

        {/* Gráfico circular */}
        <View style={tw`items-center mb-6`}>
          <PieChart
            data={chartData.map((item) => ({
              ...item,
              legendFontColor: theme === "dark" ? "#FFF" : "#7F7F7F",
            }))}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              color: (opacity = 1) => (theme === "dark" ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`),
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>

        {/* Lista de sustancias */}
        <View style={tw`px-4`}>
          {chartData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate("Detail", { substance: item.name })}
              style={[
                tw`mb-4 p-4 rounded-lg flex-row justify-between items-center`,
                theme === "dark" ? tw`bg-gray-700` : tw`bg-gray-100`,
              ]}
            >
              <View style={tw`flex-row items-center`}>
                {/* Indicador de color */}
                <View
                  style={[
                    tw`w-4 h-4 rounded-full mr-4`,
                    { backgroundColor: item.color },
                  ]}
                />
                <View>
                  <Text
                    style={[
                      tw`text-lg font-semibold`,
                      theme === "dark" ? tw`text-white` : tw`text-black`,
                    ]}
                  >
                    {item.population}%
                  </Text>
                  <Text
                    style={[
                      tw`text-sm`,
                      theme === "dark" ? tw`text-gray-300` : tw`text-gray-600`,
                    ]}
                  >
                    Nivel de {item.name}
                  </Text>
                </View>
              </View>
              {/* Icono de flecha */}
              <Text style={tw`text-gray-400 text-lg`}>{">"}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SubstanceScreen;
