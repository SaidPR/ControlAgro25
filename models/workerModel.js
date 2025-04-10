import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../services/firebaseConfig";

// Función para obtener las asistencias de un trabajador
export const getAttendanceData = async (workerId) => {
  const attendanceCollection = collection(FIRESTORE_DB, "attendance");
  const q = query(attendanceCollection, where("workerId", "==", workerId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
};

// Función para generar un reporte de asistencia
export const generateReport = async (worker, attendanceData) => {
  const reportData = {
    title: `Reporte de Asistencia de ${worker.name}`,
    date: new Date().toLocaleDateString(),
    description: `Reporte generado para el trabajador ${worker.name}`,
    workerId: worker.id,
    createdAt: new Date(),
    attendance: attendanceData,
  };

  const reportsCollection = collection(FIRESTORE_DB, "reports");
  await addDoc(reportsCollection, reportData);
};
