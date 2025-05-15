import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../services/firebaseConfig";
import ProductionRecord from "../../models/ProductionModel";

class ProductionViewModel {
    async fetchConfirmedUsers() {
        try {
            console.log("Fetching confirmed attendance...");

            const attendanceSnapshot = await getDocs(collection(FIRESTORE_DB, "attendance"));
            const confirmedAttendance = attendanceSnapshot.docs
                .filter((doc) => doc.data().status === "Confirmada")
                .map((doc) => doc.data().workerId);

            if (confirmedAttendance.length === 0) {
                console.warn("No se encontraron registros de asistencia confirmados.");
                return [];
            }

            const usersSnapshot = await getDocs(collection(FIRESTORE_DB, "users"));
            const filteredUsers = usersSnapshot.docs
                .map((doc) => ({ id: doc.id, ...doc.data() }))
                .filter((user) => confirmedAttendance.includes(user.id));

            return filteredUsers;
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            throw new Error("No se pudieron cargar los usuarios.");
        }
    }

    async saveRecord(record, existingRecord, onSave, navigation) {
        try {
            if (existingRecord) {
                console.log("Actualizando registro:", record);
                // Aquí iría la lógica de actualización en Firebase
            } else if (onSave) {
                console.log("Guardando nuevo registro:", record);
                onSave(record);
                navigation.goBack();
            }
        } catch (error) {
            console.error("Error al guardar el registro:", error);
            throw new Error("No se pudo guardar el registro.");
        }
    }
}

export default new ProductionViewModel();