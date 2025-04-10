import { useState, useEffect } from "react";
import { FIREBASE_AUTH } from "../../services/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

export const useLoginViewModel = (navigation) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

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
        trigger: null,
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

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
  };
};
