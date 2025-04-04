import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MenuLateral from "../components/Slidebar";
import BottomNavigationBar from "../components/BottomNavigationBar";

const { width } = Dimensions.get("window");

export default function PantallaInicio({ navigation }) {
  return (
    <View style={estilos.contenedor}>
      {/* Menú lateral */}
      <MenuLateral navigation={navigation} />

      {/* Encabezado con mensaje motivacional */}
      <View style={estilos.encabezado}>
        <Text style={estilos.textoEncabezado}></Text>
      </View>

      {/* Tarjeta que muestra las ganancias brutas */}
      <View style={estilos.tarjeta}>
        <Text style={estilos.tituloTarjeta}>Ganancia Bruto</Text>
        <Text style={estilos.cantidadTarjeta}>$0.00</Text>
      </View>

      {/* Barra de navegación inferior */}
      <BottomNavigationBar navigation={navigation} />
    </View>
  );
}

// Estilos
const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#fff",
  },
  encabezado: {
    backgroundColor: "#FF7F00",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  textoEncabezado: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 90,
    padding: 20,
  },
  tarjeta: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tituloTarjeta: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  cantidadTarjeta: {
    fontSize: 24,
    color: "#FF7F00",
    fontWeight: "bold",
  },
});
