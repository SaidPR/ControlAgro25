import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions, 
  KeyboardAvoidingView, 
  ScrollView, 
  Platform, 
} from "react-native";
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../services/firebaseConfig";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

const { width, height } = Dimensions.get("window");

const ChangePasswordScreen = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const handlePasswordChange = async () => {
    const user = FIREBASE_AUTH.currentUser;

    if (!user) {
      Alert.alert("Error", "No hay un usuario autenticado. Por favor, inicia sesión de nuevo.");
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Las nuevas contraseñas no coinciden. Por favor, verifica.");
      return;
    }

    if (newPassword.length < 6) { // Basic password length validation
        Alert.alert("Error", "La nueva contraseña debe tener al menos 6 caracteres.");
        return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Contraseña Actualizada",
          body: "Tu contraseña ha sido cambiada con éxito. Por seguridad, te recomendamos volver a iniciar sesión.",
          sound: true,
        },
        trigger: null,
      });
      navigation.navigate("Start");
    } catch (error) {
      console.error("Error al cambiar contraseña:", error.code, error.message);
      let errorMessage = "Ocurrió un error inesperado al actualizar tu contraseña. Intenta nuevamente.";

      switch (error.code) {
        case "auth/wrong-password":
          errorMessage = "La contraseña actual es incorrecta.";
          break;
        case "auth/user-mismatch":
          errorMessage = "Credenciales incorrectas para este usuario.";
          break;
        case "auth/requires-recent-login":
            errorMessage = "Esta acción requiere que hayas iniciado sesión recientemente. Por favor, vuelve a iniciar sesión y reintenta.";
            break;
        case "auth/invalid-email":
            errorMessage = "El correo electrónico asociado a tu cuenta no es válido.";
            break;
        case "auth/network-request-failed":
            errorMessage = "Error de conexión. Revisa tu conexión a internet.";
            break;
        default:
          errorMessage = `Error: ${error.message || "Algo salió mal."}`;
          break;
      }
      Alert.alert("Error al Actualizar", errorMessage);

    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cambiar Contraseña</Text>
        </View>

        <View style={styles.passwordCard}>
          <Text style={styles.instructionText}>
            Para cambiar tu contraseña, primero verifica tu contraseña actual y luego introduce la nueva.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Contraseña actual"
            placeholderTextColor="#999"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Nueva contraseña"
            placeholderTextColor="#999"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar nueva contraseña"
            placeholderTextColor="#999"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity style={styles.actionButton} onPress={handlePasswordChange}>
            <Text style={styles.buttonText}>Actualizar Contraseña</Text>
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
    marginTop: height * 0.02, 
    marginBottom: height * 0.05, 
  },
  passwordCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    marginHorizontal: width * 0.05,
    padding: width * 0.06,
    marginTop: -height * 0.05, 
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
    marginBottom: height * 0.02, 
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

export default ChangePasswordScreen;