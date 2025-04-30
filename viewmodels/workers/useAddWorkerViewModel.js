import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../services/firebaseConfig";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

const useAddWorkerViewModel = (navigation) => {

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

  const [formData, setFormData] = useState({
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    telefono: "",
    email: "",
    password: "",
    fechaNacimiento: "",
    curp: "",
  });

  const [error, setError] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      handleInputChange("fechaNacimiento", formattedDate);
    }
  };

  const handleRegistro = async () => {
    const { email, password, primerNombre, primerApellido, segundoApellido, telefono, fechaNacimiento, curp } = formData;

    if (!email || !password || !primerNombre || !primerApellido || !segundoApellido || !telefono || !fechaNacimiento || !curp) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Datos incompletos",
          body: "Por favor rellene todos los campos.",
          sound: "default",
        },
        trigger: null,
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;

      const userData = {
        name: `${formData.primerNombre} ${formData.segundoNombre} ${formData.primerApellido} ${formData.segundoApellido}`.trim(),
        phone: formData.telefono,
        email,
        fechaNacimiento,
        curp: formData.curp,
        role: "TRABAJADOR",
      };

      const usersCollectionRef = collection(FIRESTORE_DB, "users");
      await addDoc(usersCollectionRef, userData);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Inicio de sesión exitoso",
          body: `!Bienvenido, ${user.email}!`,
          sound: "default",
        },
        trigger: null,
      });

      setTimeout(() => {
        navigation.navigate("Home");
      }, 300);
    } catch (error) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Error",
          body: "Error al realizar el registro.",
          sound: "default",
        },
        trigger: null,
      });
      return;
    }
  };

  return {
    formData,
    error,
    showDatePicker,
    handleInputChange,
    handleDateChange,
    handleRegistro,
    setShowDatePicker,
  };
};

export default useAddWorkerViewModel;
