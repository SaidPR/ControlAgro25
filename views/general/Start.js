import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const VentanaVistaUsuario = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/agro.jpg")} 
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Logotipo */}
        <Image
          style={styles.logoAgricola}
          resizeMode="contain"
          source={require("../../assets/Agro.webp")}
        />

        {/* Botones principales */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.button1]}
            onPress={() => navigation.navigate("LogIn")}
          >
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.button2]}
            onPress={() => navigation.navigate("RegUsuario")}
          >
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>

        {/* Botón adicional */}
        <TouchableOpacity
          style={styles.eresNuevoButton}
          onPress={() => navigation.navigate("RegUsuario")}
        >
          <Text style={styles.eresNuevo}>¿Eres nuevo?</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "space-between", // Distribuir elementos verticalmente
    alignItems: "center",
    paddingVertical: height * 0.07, // Ajustar espaciado general
  },
  logoAgricola: {
    width: width * 0.6, // Tamaño ajustado para Figma
    height: width * 0.6, // Mantener proporción
    marginTop: height * 0.09, // Espaciado superior
    borderRadius: 15,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0, // Espaciado debajo del logotipo
  },
  button: {
    width: width * 0.8, // Botones más grandes para destacar
    paddingVertical: height * 0.02,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: height * 0.02, // Espaciado entre botones
    elevation: 4,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  button1: {
    backgroundColor: "#14ae5c",
  },
  button2: {
    backgroundColor: "#e8b931",
  },
  buttonText: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#fff",
  },
  eresNuevoButton: {
    backgroundColor: "#cb6162",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.2,
    borderRadius: 20,
    elevation: 6,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowColor: "rgba(0, 0, 0, 0.3)",
    marginBottom: height * 0.05, // Separar del borde inferior
  },
  eresNuevo: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default VentanaVistaUsuario;