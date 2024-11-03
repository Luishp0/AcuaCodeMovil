import React from "react";
import { View, Text, TouchableOpacity, ScrollView,Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import tw from 'twrnc';
import Navbar from "../assets/NavBar";

const screenWidth = Dimensions.get("window").width;

const SubstanceScreen = ({ navigation }) => {
  // Datos del gráfico circular
  const chartData = [
    { name: "Cloro", population: 1, color: "#42A5F5", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "Nitrato", population: 2, color: "#66BB6A", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "Nitrito", population: 0.50, color: "#FFA726", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "Amoniaco", population: 1, color: "#EF5350", legendFontColor: "#7F7F7F", legendFontSize: 15 },
  ];

  return (
    <ScrollView style={tw`bg-white flex-1`}>
      <Navbar navigation={navigation}/>
      {/* Título */}
      <View style={tw`p-4`}>
        <Text style={tw`text-center text-xl font-bold`}>Sustancias del agua</Text>
      </View>

      {/* Gráfico circular */}
      <View style={tw`items-center mb-6`}>
        <PieChart
          data={chartData}
          width={screenWidth - 40} // Ajustamos el ancho al tamaño de la pantalla
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute // Muestra los valores porcentuales dentro del gráfico
        />
      </View>

      {/* Lista de sustancias */}
      <View style={tw`px-4`}>
        {chartData.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('Detail', { substance: item.name })}
            style={tw`mb-4 p-4 bg-gray-100 rounded-lg flex-row justify-between items-center`}
          >
            <View style={tw`flex-row items-center`}>
              {/* Indicador de color */}
              <View style={[tw`w-4 h-4 rounded-full mr-4`, { backgroundColor: item.color }]} />
              <View>
                <Text style={tw`text-lg font-semibold`}>{item.population}%</Text>
                <Text style={tw`text-gray-600`}>Nivel de {item.name}</Text>
              </View>
            </View>
            {/* Icono de flecha (puede ser un ícono o símbolo personalizado) */}
            <Text style={tw`text-gray-400 text-lg`}>{'>'}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default SubstanceScreen;
