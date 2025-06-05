import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { FIREBASE_AUTH } from "../../services/firebaseConfig";
// import Device from 'expo-device'; // You might need to uncomment and install expo-device if using Notifications with Device.isDevice
import * as Notifications from "expo-notifications";

const { width, height } = Dimensions.get("window");

const RecoverPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleRecoverPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Por favor, ingresa un correo válido.");
      return;
    }

    try {
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
      Alert.alert(
        "Correo enviado",
        "Revisa tu bandeja de entrada para restablecer tu contraseña. Si no lo encuentras, revisa la carpeta de spam.",
        [
          {
            text: "Ok",
            onPress: () => navigation.navigate("LogIn"),
          },
        ]
      );
    } catch (error) {
      let errorMessage = "Ocurrió un error inesperado. Intenta nuevamente.";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "El formato del correo electrónico no es válido.";
          break;
        case "auth/user-not-found":
          errorMessage = "No existe una cuenta con este correo electrónico.";
          break;
        case "auth/missing-email": 
          errorMessage = "Por favor, ingresa tu correo electrónico.";
          break;
        default:
          console.error("Firebase Password Reset Error:", error.message);
          errorMessage = `Ocurrió un error: ${error.message}`; 
      }
      Alert.alert("Error al restablecer contraseña", errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Recuperar Contraseña</Text>
        </View>

        <View style={styles.recoveryCard}>
          <Text style={styles.instructionText}>
            Ingresa el correo electrónico asociado a tu cuenta y te enviaremos un enlace para restablecer tu contraseña.
          </Text>

          <TextInput
            placeholder="Correo Electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
            placeholderTextColor="#999"
            autoCapitalize="none" 
          />

          <TouchableOpacity style={styles.actionButton} onPress={handleRecoverPassword}>
            <Text style={styles.buttonText}>Enviar Enlace</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
    backgroundColor: "#F5F8FC", 
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "flex-start", 
    alignItems: "center",
    paddingBottom: height * 0.05, 
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
    marginTop: 50,
  },
  recoveryCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    marginHorizontal: width * 0.05,
    padding: width * 0.06,
    marginTop: -height * 0.01, 
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  instructionText: {
    fontSize: width * 0.042,
    color: "#555",
    textAlign: "center",
    marginBottom: height * 0.03,
    lineHeight: width * 0.06,
    paddingHorizontal: width * 0.02,
  },
  input: {
    width: "100%",
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.04,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    backgroundColor: "#fcfcfc",
    marginBottom: height * 0.025, 
    fontSize: width * 0.04,
    color: '#333',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  actionButton: {
    width: "100%",
    paddingVertical: height * 0.022,
    backgroundColor: "#14AE5C", 
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.01,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.048,
    fontWeight: "bold",
  },
  cancelButton: {
    width: "100%",
    paddingVertical: height * 0.018, 
    backgroundColor: 'transparent', 
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.02, 
    borderWidth: 1, 
    borderColor: "#C0C0C0", 
  },
  cancelButtonText: {
    color: "#666", 
    fontSize: width * 0.045,
    fontWeight: "normal", 
  },
});

export default RecoverPasswordScreen;