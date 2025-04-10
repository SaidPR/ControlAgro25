import { useState, useEffect } from "react";
import { getAttendanceData, generateReport } from "../../models/workerModel";

const useWorkerDetails = (worker) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (worker) {
      setLoading(true);
      getAttendanceData(worker.id)
        .then((data) => setAttendanceData(data))
        .catch((error) => console.error("Error fetching attendance data:", error))
        .finally(() => setLoading(false));
    }
  }, [worker]);

  const handleGenerateReport = async () => {
    try {
      if (attendanceData.length === 0) {
        alert("No se encontraron registros de asistencia.");
        return;
      }
      await generateReport(worker, attendanceData);
      alert("Reporte Generado");
    } catch (error) {
      console.error("Error al generar el reporte:", error);
      alert("No se pudo generar el reporte.");
    }
  };

  return {
    attendanceData,
    loading,
    handleGenerateReport,
  };
};

export default useWorkerDetails;
