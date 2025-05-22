import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../services/firebaseConfig";
import { Alert } from "react-native";

const useReportsViewModel = (navigation) => {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const reportsCollection = collection(FIRESTORE_DB, "reports");
      const snapshot = await getDocs(reportsCollection);
      const reportsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReports(reportsData);
    } catch (error) {
      console.error("Error al cargar los reportes:", error);
      Alert.alert("Error", "No se pudieron cargar los reportes.");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return {
    reports,
    fetchReports,
  };
};

export default useReportsViewModel;