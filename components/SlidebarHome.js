import { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Image, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import logo from "../assets/agroLogo.webp"; 

const { width, height } = Dimensions.get("window");

export default function MenuLateralPrincipal({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false); 
  const animacionSlide = useRef(new Animated.Value(-width * 0.7)).current; 

  const alternarMenu = () => {
    if (menuVisible) {
      Animated.timing(animacionSlide, {
        toValue: -width * 0.7, 
        duration: 300,
        useNativeDriver: false,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(animacionSlide, {
        toValue: 0, 
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={estilos.contenedor}>
      {/* Fondo oscuro cuando el menú está abierto */}
      {menuVisible && (
        <TouchableOpacity
          style={estilos.superposicion}
          activeOpacity={1}
          onPress={alternarMenu} 
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
            navigation.navigate("Account");
          }}
        >
          <Text style={estilos.textoMenu}>Información de la Cuenta</Text>
          <MaterialIcons name="chevron-right" size={24} color="#A5D6A7" />
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.opcionMenu}
          onPress={() => {
            alternarMenu();
            navigation.navigate("Settings");
          }}
        >
          <Text style={estilos.textoMenu}>Configuración</Text>
          <MaterialIcons name="chevron-right" size={24} color="#A5D6A7" />
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.opcionMenu}
          onPress={() => {
            alternarMenu();
            navigation.navigate("Home");
          }}
        >
          <Text style={estilos.textoMenu}>Menú Principal</Text>
          <MaterialIcons name="chevron-right" size={24} color="#A5D6A7" />
        </TouchableOpacity>
        {/* Botón para cerrar sesión */} 
        <TouchableOpacity
          style={estilos.botonCerrarSesion}
          onPress={() => {
            alternarMenu();
            navigation.navigate("Start")
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
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    zIndex: 5, 
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
    zIndex: 10, 
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
    color: "#0E8C47",
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
