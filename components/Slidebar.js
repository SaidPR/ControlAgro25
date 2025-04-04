import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Image, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../services/firebaseConfig";
import logo from "../assets/Agro.webp"; 

const { width, height } = Dimensions.get("window");

export default function MenuLateral({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false); 
  const animacionSlide = useRef(new Animated.Value(-width * 0.7)).current; 

  const alternarMenu = () => {
    if (menuVisible) {
      Animated.timing(animacionSlide, {
        toValue: -width * 0.7, // Ocultar menú
        duration: 300,
        useNativeDriver: false,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(animacionSlide, {
        toValue: 0, // Mostrar menú
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const cerrarSesion = async () => {
    try {
      await signOut(FIREBASE_AUTH); 
      Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
      navigation.navigate("LogIn"); 
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al cerrar sesión.");
    }
  };

  return (
    <View style={estilos.contenedor}>
      {/* Fondo oscuro cuando el menú está abierto */}
      {menuVisible && (
        <TouchableOpacity
          style={estilos.superposicion}
          activeOpacity={1}
          onPress={alternarMenu} // Cierra el menú al presionar el fondo
        />
      )}

      {/* Contenedor del menú lateral */}
      <Animated.View style={[estilos.barraLateral, { left: animacionSlide }]}>
        {/* Logo en el menú */}
        <Image source={logo} style={estilos.logo} />

        {/* Opciones del menú */}
        <TouchableOpacity
          style={estilos.opcionMenu}
          onPress={() => {
            alternarMenu();
            navigation.navigate("Lista");
          }}
        >
          <Text style={estilos.textoMenu}>Pase de lista</Text>
          <MaterialIcons name="chevron-right" size={24} color="#007bff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.opcionMenu}
          onPress={() => {
            alternarMenu();
            navigation.navigate("Clientes");
          }}
        >
          <Text style={estilos.textoMenu}>Administrar Usuarios</Text>
          <MaterialIcons name="chevron-right" size={24} color="#007bff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.opcionMenu}
          onPress={() => {
            alternarMenu();
            navigation.navigate("Inventario");
          }}
        >
          <Text style={estilos.textoMenu}>Gestión de Trabajadores</Text>
          <MaterialIcons name="chevron-right" size={24} color="#007bff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.opcionMenu}
          onPress={() => {
            alternarMenu();
            navigation.navigate("Proveedores");
          }}
        >
          <Text style={estilos.textoMenu}>Control de Producción</Text>
          <MaterialIcons name="chevron-right" size={24} color="#007bff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.opcionMenu}
          onPress={() => {
            alternarMenu();
            navigation.navigate("Proveedores");
          }}
        >
          <Text style={estilos.textoMenu}>Gestión de Reportes</Text>
          <MaterialIcons name="chevron-right" size={24} color="#007bff" />
        </TouchableOpacity>
        {/* Botón para cerrar sesión */}
        <TouchableOpacity
          style={estilos.botonCerrarSesion}
          onPress={() => {
            alternarMenu();
            cerrarSesion();
          }}
        >
          <Text style={estilos.textoCerrarSesion}>Cerrar Sesión</Text>
          <MaterialIcons name="logout" size={25} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>

      {/* Botón para abrir el menú */}
      <TouchableOpacity onPress={alternarMenu} style={estilos.botonMenu}>
        <MaterialIcons name="menu" size={40} color="#333" />
      </TouchableOpacity>
    </View>
  );
}

// Estilos
const estilos = StyleSheet.create({
  contenedor: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  superposicion: {
    position: "absolute",
    top: 0,
    left: 0,
    right: -40,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
    zIndex: 5, // Por encima del contenido principal
  },
  barraLateral: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: width * 0.7,
    backgroundColor: "#fff",
    padding: 20,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    zIndex: 10, // Encima de la superposición
  },
  logo: {
    width: width * 0.6,
    height: width * 0.4,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 15,
  },
  opcionMenu: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textoMenu: {
    fontSize: 18,
    color: "#007bff",
    fontWeight: "bold",
  },
  botonCerrarSesion: {
    width: "100%",
    paddingVertical: height * 0.02,
    backgroundColor: "#953233",
    borderRadius: 10,
    alignItems: "center",
    marginTop: height * 0.25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  textoCerrarSesion: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  botonMenu: {
    marginTop: 40,
    marginLeft: 20,
    zIndex: 20,
  },
});
