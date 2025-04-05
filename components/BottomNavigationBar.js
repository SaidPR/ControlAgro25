import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function BottomNavigationBar({ navigation }) {
  return (
    <View style={styles.barraNavegacion}>
      <TouchableOpacity
        style={styles.botonNavegacion}
        onPress={() => navigation.navigate("Home")}
      >
        <MaterialIcons name="home" size={33} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.botonNavegacion}
        onPress={() => navigation.navigate("Settings")}
      >
        <MaterialIcons name="settings" size={33} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  barraNavegacion: {
    position: "absolute",
    bottom: 10,
    width: width,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  botonNavegacion: {
    alignItems: "center",
    justifyContent: "center",
  },
});