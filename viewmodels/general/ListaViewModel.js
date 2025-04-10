import { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../services/firebaseConfig";

const useListaViewModel = () => {
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  const fetchWorkers = async () => {
    try {
      const querySnapshot = await getDocs(collection(FIRESTORE_DB, "users"));
      const workersData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.role === "TRABAJADOR") {
          workersData.push({ id: doc.id, ...data, attendanceStatus: null });
        }
      });

      // Agrupar por estado
      const sortedWorkers = [
        ...workersData.filter((w) => w.attendanceStatus === "Confirmada"),
        ...workersData.filter((w) => w.attendanceStatus === null),
        ...workersData.filter((w) => w.attendanceStatus === "Negada"),
      ];

      setWorkers(sortedWorkers);
      setFilteredWorkers(sortedWorkers);
    } catch (error) {
      console.error("Error al obtener trabajadores:", error);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text === "") {
      setFilteredWorkers(workers);
    } else {
      const filtered = workers.filter((worker) =>
        worker.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredWorkers(filtered);
    }
  };

  const handleAttendance = async (workerId, status) => {
    try {
      const today = new Date().toISOString().split("T")[0];

      // Verificar si ya existe un registro de asistencia
      const querySnapshot = await getDocs(collection(FIRESTORE_DB, "attendance"));
      const existingAttendance = querySnapshot.docs.find((doc) => {
        const data = doc.data();
        return data.workerId === workerId && data.date === today;
      });

      if (existingAttendance) {
        alert("Ya se ha registrado la asistencia para hoy.");
        return;
      }

      // Registrar nueva asistencia
      const attendanceCollectionRef = collection(FIRESTORE_DB, "attendance");
      await addDoc(attendanceCollectionRef, {
        workerId,
        status,
        date: today,
      });

      // Actualizar trabajadores en el estado
      const updatedWorkers = workers.map((worker) =>
        worker.id === workerId ? { ...worker, attendanceStatus: status } : worker
      );
      const sorted = [
        ...updatedWorkers.filter((w) => w.attendanceStatus === "Confirmada"),
        ...updatedWorkers.filter((w) => w.attendanceStatus === null),
        ...updatedWorkers.filter((w) => w.attendanceStatus === "Negada"),
      ];
      setWorkers(sorted);
      setFilteredWorkers(sorted);

      console.log("Asistencia registrada con éxito");
    } catch (error) {
      console.error("Error al registrar asistencia:", error);
    }
  };

  return {
    workers,
    filteredWorkers,
    searchText,
    currentDate,
    fetchWorkers,
    handleSearch,
    handleAttendance,
  };
};

export default useListaViewModel;
