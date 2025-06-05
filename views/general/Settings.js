import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert, Platform } from "react-native";
import MenuLateral from "../../components/Slidebar";
import BottomNavigationBar from "../../components/BottomNavigationBar";

const { width, height } = Dimensions.get("window");

const Settings = ({ navigation }) => {

  const handleChangePassword = () => {
  navigation.navigate("ChangePasswordScreen");
  };

  const handleAboutApp = () => {
    Alert.alert("Acerca de la App", "Versión 1.0.0\n\n© 2025 Todos los derechos reservados.");
  };

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres cerrar tu sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Cerrar Sesión",
          onPress: () => {
            Alert.alert("Sesión Cerrada", "Has cerrado tu sesión exitosamente.");
            navigation.navigate("LogIn"); 
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Configuración</Text>
      </View>

      <View style={styles.settingsCard}>
        <TouchableOpacity style={styles.optionItem} onPress={handleChangePassword}>
          <Text style={styles.optionText}>Cambiar Contraseña</Text>
          <Text style={styles.arrowIcon}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem} onPress={handleAboutApp}>
          <Text style={styles.optionText}>Acerca de la App</Text>
          <Text style={styles.arrowIcon}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      <MenuLateral navigation={navigation} />
      <BottomNavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F5F8FC", 
  },
  header: {
    backgroundColor: "#0E8C47", 
    paddingTop: Platform.OS === 'ios' ? height * 0.06 : height * 0.03,
    paddingBottom: height * 0.04,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
    justifyContent: "flex-end",
    width: '100%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  headerTitle: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
  },
  settingsCard: {
    backgroundColor: "#ffffff", 
    borderRadius: 15,
    marginHorizontal: width * 0.05,
    paddingVertical: height * 0.01, 
    marginTop: -height * 0.01, 
    width: "90%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.06,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', 
  },
  optionText: {
    fontSize: width * 0.045,
    color: "#333",
    flex: 1, 
  },
  arrowIcon: {
    fontSize: width * 0.06,
    color: "#C0C0C0", 
    fontWeight: '300', 
  },
  logoutButton: {
    backgroundColor: "#E74C3C", 
    borderRadius: 10,
    paddingVertical: height * 0.018,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: width * 0.06,
    marginTop: height * 0.03, 
    marginBottom: height * 0.02, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: width * 0.048,
    fontWeight: "bold",
  },
});

export default Settings;