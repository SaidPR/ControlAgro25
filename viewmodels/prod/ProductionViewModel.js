import { collection, doc, setDoc, addDoc, getDocs } from "firebase/firestore";
import { Alert } from "react-native";
import { FIRESTORE_DB } from "../../services/firebaseConfig";

class ProductionViewModel {
    async fetchConfirmedUsers() {
        try {
            const attendanceSnapshot = await getDocs(collection(FIRESTORE_DB, "attendance"));
            const confirmedAttendance = attendanceSnapshot.docs
                .filter((doc) => doc.data().status === "Confirmada")
                .map((doc) => doc.data().workerId);

            if (confirmedAttendance.length === 0) return [];

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

    async saveRecord(record, existingRecord = null) {
        const data = record.toObject();

        try {
            if (existingRecord?.id) {
                return new Promise((resolve, reject) => {
                    Alert.alert(
                        "Confirmar actualización",
                        "¿Deseas actualizar este registro de producción?",
                        [
                            {
                                text: "Cancelar",
                                style: "cancel",
                                onPress: () => reject("Actualización cancelada"),
                            },
                            {
                                text: "Actualizar",
                                onPress: async () => {
                                    const docRef = doc(FIRESTORE_DB, "productions", existingRecord.id);
                                    await setDoc(docRef, data);
                                    console.log("Registro actualizado:", data);
                                    resolve();
                                },
                            },
                        ],
                        { cancelable: false }
                    );
                });
            } else {
                const collectionRef = collection(FIRESTORE_DB, "productions");
                await addDoc(collectionRef, data);
                console.log("Nuevo registro guardado:", data);
            }
        } catch (error) {
            console.error("Error al guardar el registro:", error);
            throw new Error("No se pudo guardar el registro.");
        }
    }
}

export default new ProductionViewModel();
