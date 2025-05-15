import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../services/firebaseConfig";
import { Alert } from "react-native";

const useProductionDetailsViewModel = (navigation, record) => {
  const handleEdit = () => {
    navigation.navigate("AddProduction", {
      record,
      onSave: async (updatedRecord) => {
        try {
          const recordRef = doc(FIRESTORE_DB, "productions", record.id);
          await updateDoc(recordRef, updatedRecord);
          Alert.alert("Éxito", "El registro fue actualizado.");
          navigation.goBack();
        } catch (error) {
          console.error("Error al actualizar el registro:", error);
          Alert.alert("Error", "No se pudo actualizar el registro.");
        }
      },
    });
  };

  const handleDelete = async () => {
    Alert.alert("Eliminar", "¿Estás seguro de eliminar este registro?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        onPress: async () => {
          try {
            const recordRef = doc(FIRESTORE_DB, "productions", record.id);
            await deleteDoc(recordRef);
            Alert.alert("Éxito", "El registro fue eliminado.");
            navigation.goBack();
          } catch (error) {
            console.error("Error al eliminar el registro:", error);
            Alert.alert("Error", "No se pudo eliminar el registro.");
          }
        },
      },
    ]);
  };

  return {
    handleEdit,
    handleDelete,
  };
};

export default useProductionDetailsViewModel;