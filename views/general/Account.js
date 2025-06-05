import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, ScrollView } from "react-native"; 
import { fetchCurrentUserData } from "../../services/userService"; 
import MenuLateral from "../../components/Slidebar";
import BottomNavigationBar from "../../components/BottomNavigationBar";

const { width, height } = Dimensions.get("window"); 

export default function Account({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentUserData()
      .then(data => setUserData(data))
      .catch(error => {
        console.error("Error al cargar datos del usuario:", error);
        Alert.alert("Error", "No se pudieron cargar los datos del usuario.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0E8C47" />
        <Text style={styles.loadingText}>Cargando datos del usuario...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se encontraron datos del usuario.</Text>
        <Text style={styles.errorText}>Por favor, intente de nuevo más tarde.</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      {/* Menú lateral */}
      <MenuLateral navigation={navigation} />

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Mi Cuenta</Text>
        </View>

        <View style={styles.content}>
          {/* Sección de Nombre */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.value}>{userData.name}</Text>
          </View>
          <View style={styles.separator} />

          {/* Sección de Email */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{userData.email}</Text>
          </View>
          <View style={styles.separator} />

          {/* Sección de Fecha de Nacimiento */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Fecha de Nacimiento:</Text>
            <Text style={styles.value}>{userData.fechaNacimiento}</Text>
          </View>
          <View style={styles.separator} />

          {/* Sección de Teléfono */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Teléfono:</Text>
            <Text style={styles.value}>{userData.phone}</Text>
          </View>
          <View style={styles.separator} />

          {/* Sección de Rol */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Rol:</Text>
            <Text style={styles.value}>{userData.role}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Barra de navegación inferior */}
      <BottomNavigationBar navigation={navigation} />
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#d32f2f",
    textAlign: "center",
    marginBottom: 5,
  },
  header: {
    backgroundColor: "#0E8C47",
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "flex-end",
    height: height * 0.18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  content: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
    marginTop: -10,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: "#555",
    flex: 2,
    textAlign: "right",
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 0,
  },
});