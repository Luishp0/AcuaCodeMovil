import React from "react";
import { Text,View } from "react-native";
import Navbar from "../assets/NavBar";

const ConfigurationScreen = ({navigation}) =>{

    return(
        <View>
            <Navbar navigation={navigation}/>

        </View>
    )
}

export default ConfigurationScreen