import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../services/firebaseConfig";
import { Alert } from "react-native";

const useDetailsReportsViewModel = (navigation, report) => {
  const [error, setError] = useState(null);

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    if (isNaN(formattedDate.getTime())) {
      return "";
    }
    return formattedDate.toLocaleString();
  };

  const handleDeleteReport = async () => {
    Alert.alert(
      "Eliminar Reporte",
      "¿Estás seguro de que deseas eliminar este reporte?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: deleteReport },
      ]
    );
  };

  const deleteReport = async () => {
    try {
      const reportRef = doc(FIRESTORE_DB, "reports", report.id);
      await deleteDoc(reportRef);
      Alert.alert("Éxito", "El reporte ha sido eliminado.");
      navigation.goBack();
    } catch (error) {
      console.error("Error al eliminar el reporte:", error);
      Alert.alert("Error", "No se pudo eliminar el reporte.");
      setError(error.message);
    }
  };

  return {
    formatDate,
    handleDeleteReport,
    error,
  };
};

export default useDetailsReportsViewModel;