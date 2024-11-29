import React from "react";
import { View, Text } from "react-native";
import { useTailwind } from "tailwind-rn";

const StartContentScreen = () => {
  const tailwind = useTailwind();

  return (
    <View style={tailwind("flex-1 justify-center items-center bg-blue-200")}>
      {/* Main Card */}
      <View style={tailwind("w-11/12 bg-blue-500 rounded-lg p-6")}>
        {/* Header */}
        <Text style={tailwind("text-white text-xl font-bold mb-4")}>
          AcuaCode
        </Text>
        {/* Fish Tank Condition Text */}
        <Text style={tailwind("text-white text-lg mb-2")}>
          Condición de la pecera:
        </Text>
        <Text style={tailwind("text-white mb-6")}>
          La pecera se encuentra en excelentes condiciones.
        </Text>
        {/* Gauge / Status */}
        <View style={tailwind("items-center")}>
          <View
            style={[
              tailwind("bg-white rounded-full items-center justify-center"),
              { width: 150, height: 75, overflow: "hidden" },
            ]}
          >
            <Text style={tailwind("text-blue-500 text-xl font-bold")}>100%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StartContentScreen;
