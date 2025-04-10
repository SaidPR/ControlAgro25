import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../services/firebaseConfig";
import { Alert } from "react-native";

export const useUserEditViewModel = (user, navigation) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const handleUpdateUser = async () => {
    if (!name || !email || !phone) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    try {
      const userRef = doc(FIRESTORE_DB, "users", user.id);
      await updateDoc(userRef, { name, email, phone });

      Alert.alert("Éxito", "Usuario actualizado correctamente.");
      navigation.goBack();
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      Alert.alert("Error", "No se pudo actualizar el usuario.");
    }
  };

  return {
    name,
    email,
    phone,
    setName,
    setEmail,
    setPhone,
    handleUpdateUser,
  };
};
