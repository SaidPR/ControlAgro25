import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions,
  KeyboardAvoidingView, ScrollView, Platform, } 
from "react-native";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../services/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  async function registerForPushNotificationsAsync() {
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
  }

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Correo inválido",
          body: "Por favor ingrese un correo electrónico válido.",
          sound: "default",
        },
        trigger: null,
      });
      return;
    }
   

    try {
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Inicio de sesión exitoso",
          body: `Bienvenido de nuevo, ${user.email}!`,
          sound: "default",
        },
        trigger: null, // Se muestra de inmediato
      });

      setTimeout(() => {
        navigation.navigate("Home");
      }, 300);
    } catch (error) {
      let errorMessage = "Error de inicio de sesión";
    
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Correo electrónico inválido";
          break;
        case "auth/wrong-password":
          errorMessage = "Contraseña incorrecta";
          break;
        case "auth/user-not-found":
          errorMessage = "El usuario no está registrado";
          break;
        default:
          errorMessage = "Error de inicio de sesión";
          break;
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

  const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Círculo de fondo */}
        <View style={styles.backgroundCircle} />
        <Text style={styles.title}>¡Bienvenido de nuevo!</Text>
        <TextInput
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("RecoverPassword")}>
          <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
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
    backgroundColor: "#f5f6fa",
  },
  backgroundCircle: {
    position: "absolute",
    top: -500, 
    left: -width * 0.9, 
    width: height * 1.4, 
    height: height * 1.4, 
    borderRadius: height * 0.7, 
    backgroundColor: "#FFBDD1", 
    opacity: 0.3, 
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
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dcdde1",
    borderRadius: 20,
    backgroundColor: "#ffffff",
    marginBottom: height * 0.03,
    paddingRight: 15,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.05,
    fontSize: width * 0.04,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
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
  forgotPasswordText: {
    color: "#0E3D5D",
    fontSize: width * 0.043,
    marginTop: 10,
  },
});

export default LoginScreen;