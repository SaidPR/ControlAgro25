import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions,
  KeyboardAvoidingView, ScrollView, Platform, } 
from "react-native";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../services/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      setError("Por favor ingrese un correo electrónico válido.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;
      console.log("Usuario iniciado sesión:", user.email);

      const usersCollectionRef = collection(FIRESTORE_DB, "users");
      const q = query(usersCollectionRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await addDoc(usersCollectionRef, { email: user.email });
        console.log("Usuario creado en Firestore");
      } else {
        console.log("El usuario ya existe en Firestore");
      }

      navigation.navigate("Home");
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      switch (error.code) {
        case "auth/invalid-email":
          setError("Correo electrónico inválido");
          break;
        case "auth/wrong-password":
          setError("Contraseña incorrecta");
          break;
        case "auth/user-not-found":
          setError("El usuario no está registrado");
          break;
        default:
          setError("Error de inicio de sesión");
          break;
      }
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
        {error && <Text style={styles.errorText}>{error}</Text>}
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