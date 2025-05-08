import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../services/firebaseConfig";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

const useAddUserViewModel = (navigation) => {
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

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState(null);
  const [step, setStep] = useState("form"); // 'form' -> 'verify'

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

    // Generar código y pasar al paso de verificación
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // Código de 6 dígitos
    setGeneratedCode(code);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Código de verificación",
        body: `Tu código es: ${code}`,
        sound: "default",
      },
      trigger: null,
    });

    setStep("verify");
  };

  const handleConfirmCode = async () => {
    if (verificationCode !== generatedCode) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Código incorrecto",
          body: "El código ingresado no es válido.",
          sound: "default",
        },
        trigger: null,
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, formData.email, formData.password);
      const user = userCredential.user;

      const userData = {
        name: `${formData.primerNombre} ${formData.segundoNombre} ${formData.primerApellido} ${formData.segundoApellido}`.trim(),
        phone: formData.telefono,
        email: formData.email,
        fechaNacimiento: formData.fechaNacimiento,
        curp: formData.curp,
        role: "ADMIN",
      };

      await addDoc(collection(FIRESTORE_DB, "users"), userData);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Registro exitoso",
          body: `¡Bienvenido, ${user.email}!`,
          sound: "default",
        },
        trigger: null,
      });

      navigation.navigate("Home");
    } catch (error) {
      console.log("Error al registrar usuario:", error);
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Error de registro",
          body: "No se pudo registrar al usuario.",
          sound: "default",
        },
        trigger: null,
      });
    }
  };

  return {
    formData,
    showDatePicker,
    handleInputChange,
    handleDateChange,
    handleRegistro,
    handleConfirmCode,
    setShowDatePicker,
    verificationCode,
    setVerificationCode,
    step,
  };
};

export default useAddUserViewModel;
