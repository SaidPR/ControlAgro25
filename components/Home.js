import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ImageBackground } from "react-native";
import BottomNavigationBar from "../components/BottomNavigationBar";
import logo from "../assets/Agro.webp"; 

const { width, height } = Dimensions.get("window");

export default function PantallaInicio({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/menuBG.webp")} // Cambia la imagen de fondo aquí
      style={[styles.background]} // Asegura que el fondo ocupe todo el espacio disponible
    >
      <View style={styles.contenedor}>
        {/* Encabezado con mensaje motivacional */}
        <View style={styles.encabezado}>
          {/* Logo en el menú */}
          <Image source={logo} style={styles.logo} />
          <Text style={styles.textoEncabezado}>Bienvenido de vuelta </Text>
        </View>
        {/* Botones principales */}
        <View style={styles.buttonContainer}>
          {/* Botón Lista */}
          <TouchableOpacity
            style={[styles.button, styles.button]}
            onPress={() => navigation.navigate("Lista")}
          >
            <Text style={styles.buttonText}>Pase de Lista</Text>
          </TouchableOpacity>
          {/* Botón Usuarios */}
          <TouchableOpacity
            style={[styles.button, styles.button]}
            onPress={() => navigation.navigate("UsersList")}
          >
            <Text style={styles.buttonText}>Administrar Usuarios</Text>
          </TouchableOpacity>
          {/* Botón Trabajadores */}
          <TouchableOpacity
            style={[styles.button, styles.button]}
            onPress={() => navigation.navigate("Lista")}
          >
            <Text style={styles.buttonText}>Gestión de Trabajadores</Text>
          </TouchableOpacity>
          {/* Botón Produccion */}
          <TouchableOpacity
            style={[styles.button, styles.button]}
            onPress={() => navigation.navigate("UsersList")}
          >
            <Text style={styles.buttonText}>Control de Producción</Text>
          </TouchableOpacity>
          {/* Botón Reportes */}
          <TouchableOpacity
            style={[styles.button, styles.button]}
            onPress={() => navigation.navigate("UsersList")}
          >
            <Text style={styles.buttonText}>Gestión de Reportes</Text>
          </TouchableOpacity>
        </View>
        {/* Barra de navegación inferior */}
        <BottomNavigationBar navigation={navigation} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  encabezado: {
    backgroundColor: "#ffff",
    padding: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  textoEncabezado: {
    color: "#00000",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 5,
    padding: 20,
  },  
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.02,
    marginBottom: height * 0.16, 
  },
  button: {
    backgroundColor: "#A5D6A7",
    width: width * 0.8,
    paddingVertical: height * 0.02,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: height * 0.02,
    elevation: 4,
  },
  buttonText: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#113C12",
  },
  logo: {
    width: width * 0.6,
    height: width * 0.4,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 50,
  },
});
