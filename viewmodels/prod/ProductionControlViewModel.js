import { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../services/firebaseConfig"; 

const useProductionControlViewModel = (navigation) => {
  const [production, setProduction] = useState([]);

  // Recuperar registros de producción desde Firestore
  const fetchProduction = async () => {
    try {
      const snapshot = await getDocs(collection(FIRESTORE_DB, "productions"));
      const productionList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProduction(productionList);
    } catch (error) {
      console.error("Error al obtener los registros de producción:", error);
    }
  };

  // Guardar nuevo registro en Firestore
  const handleAddRecord = async (record) => {
    try {
      const docRef = await addDoc(collection(FIRESTORE_DB, "productions"), record);
      setProduction((prev) => [
        ...prev,
        { id: docRef.id, ...record },
      ]);
    } catch (error) {
      console.error("Error al guardar el registro:", error);
    }
  };

  // Recargar los registros después de cambios
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchProduction);
    return unsubscribe;
  }, [navigation]);

  return {
    production,
    fetchProduction,
    handleAddRecord,
  };
};

export default useProductionControlViewModel;