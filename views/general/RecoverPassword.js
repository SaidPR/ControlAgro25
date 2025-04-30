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
import * as Notifications from "expo-notifications";

const { width, height } = Dimensions.get("window");

const RecoverPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
      registerForPushNotificationsAsync();
    }, []);

  const registerForPushNotificationsAsync = async () => {
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          console.log("Permiso de notificación denegado");
          return;
        }
      } else {
        console.log("Debe usarse en un dispositivo físico para recibir notificaciones.");
      }
    };

  const handleRecoverPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Por favor, ingresa un correo válido.");
      return;
    }
  
    try {
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
      Alert.alert(
        "Correo enviado",
        "Revisa tu bandeja de entrada para restablecer tu contraseña."
      );
      navigation.navigate("LogIn"); 
    } catch (error) {
        let errorMessage = "Error de inicio de sesión";
      switch (error.code) {
        case "auth/invalid-email":
            errorMessage = "Correo electrónico inválido";
          break;
        case "auth/user-not-found":
            errorMessage = "No existe una cuenta asociada a este correo.";
            errorMessage = "Ocurrió un error inesperado. Intenta nuevamente.";
          break;
        default:
            errorMessage = "Ocurrió un error inesperado. Intenta nuevamente.";
      }
      await Notifications.scheduleNotificationAsync({
              content: {
                title: "Error al iniciar sesión",
                body: errorMessage,
                sound: "default",
              },
              trigger: null,
            });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Recuperar Contraseña</Text>

        <TextInput
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleRecoverPassword}>
          <Text style={styles.buttonText}>Enviar Enlace</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: width * 0.05,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: "600",
    color: "#272B35",
    marginBottom: height * 0.05,
  },
  input: {
    width: "100%",
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.05,
    borderWidth: 1,
    borderColor: "#dcdde1",
    borderRadius: 20,
    backgroundColor: "#ffffff",
    marginBottom: height * 0.03,
    fontSize: width * 0.04,
  },
  button: {
    width: "80%",
    paddingVertical: height * 0.02,
    backgroundColor: "#1abc9c",
    borderRadius: 20,
    alignItems: "center",
    marginBottom: height * 0.03,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: "#1A1A1A",
    fontSize: width * 0.045,
    fontWeight: "600",
  },
  cancelButton: {
    width: "80%",
    paddingVertical: height * 0.02,
    backgroundColor: "#e74c3c",
    borderRadius: 20,
    alignItems: "center",
    marginBottom: height * 0.03,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cancelButtonText: {
    color: "#ffff",
    fontSize: width * 0.045,
    fontWeight: "600",
  },
});

export default RecoverPasswordScreen;