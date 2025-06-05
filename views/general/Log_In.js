import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image, // Import Image for a potential logo
} from "react-native";
import { useLoginViewModel } from "../../viewmodels/general/LoginViewModel";

const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    verificationCode,
    setVerificationCode,
    isCodeRequested,
    handleSendVerificationCode,
    handleVerifyCode,
  } = useLoginViewModel(navigation);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Top decorative shape/background */}
        <View style={styles.topWave} />

        {/* Main content card */}
        <View style={styles.loginCard}>
          <Text style={styles.title}>¡Bienvenido de nuevo!</Text>

          {!isCodeRequested ? (
            <>
              <TextInput
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.input}
                placeholderTextColor="#999"
                autoCapitalize="none" // Important for email
              />
              <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#999"
              />

              <TouchableOpacity style={styles.button} onPress={handleSendVerificationCode}>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("RecoverPassword")}>
                <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
              </TouchableOpacity>

              {/* Optional: Link to registration */}
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>¿No tienes cuenta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("AddUser")}>
                  <Text style={styles.signupLink}> Regístrate aquí</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.verificationPrompt}>
                Hemos enviado un código de verificación a tu correo. Por favor, ingrésalo a continuación.
              </Text>
              <TextInput
                placeholder="Código de verificación"
                value={verificationCode}
                onChangeText={setVerificationCode}
                keyboardType="numeric"
                style={styles.input}
                placeholderTextColor="#999"
              />
              <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
                <Text style={styles.buttonText}>Verificar Código</Text>
              </TouchableOpacity>
            </>
          )}
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
    justifyContent: "space-between", 
    alignItems: "center",
    paddingBottom: height * 0.05, 
  },
  topWave: {
    position: "absolute",
    top: -height * 0.45, 
    left: -width * 0.2, 
    width: width * 1.5,
    height: height * 1.1, 
    borderRadius: (width * 1.5) / 2, 
    backgroundColor: "#0E8C47", 
    opacity: 0.9, 
    transform: [{ rotate: "-20deg" }], 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  loginCard: {
    backgroundColor: "#ffffff", 
    borderRadius: 25, 
    padding: width * 0.07,
    width: "90%", 
    maxWidth: 400, 
    alignItems: "center",
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 15,
    marginTop: height * 0.2, 
    marginBottom: height * 0.03, 
  },
  title: {
    fontSize: width * 0.065, 
    fontWeight: "bold",
    color: "#333", 
    marginBottom: height * 0.04,
    textAlign: "center",
  },
  input: {
    width: "100%",
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.06, 
    borderWidth: 1,
    borderColor: "#E0E0E0", 
    borderRadius: 30, 
    backgroundColor: "#F9F9F9", 
    marginBottom: height * 0.025, 
    fontSize: width * 0.045,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  button: {
    width: "90%", 
    paddingVertical: height * 0.022, 
    backgroundColor: "#14AE5C", 
    borderRadius: 30, 
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.01,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: width * 0.05, 
    fontWeight: "bold",
  },
  forgotPasswordText: {
    color: "#0E8C47", 
    fontSize: width * 0.04,
    marginTop: height * 0.01,
    textDecorationLine: 'underline',
  },
  verificationPrompt: {
    fontSize: width * 0.042,
    color: "#555",
    textAlign: "center",
    marginBottom: height * 0.03,
    lineHeight: width * 0.06,
    paddingHorizontal: width * 0.02,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: height * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    fontSize: width * 0.04,
    color: '#666',
  },
  signupLink: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#0E8C47', 
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
});

export default LoginScreen;