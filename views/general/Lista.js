import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MenuLateral from "../../components/Slidebar";
import { FIRESTORE_DB } from "../../services/firebaseConfig";
import { collection, getDocs, addDoc,} from "firebase/firestore";
import BottomNavigationBar from "../../components/BottomNavigationBar";
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

const Lista = ({ navigation }) => {
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
  
  useFocusEffect(
    React.useCallback(() => {
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
  
      fetchWorkers();
    }, [])
  );
  
  const handleSearch = (text) => {
    setSearchText(text);
    if (text === "") {
      setFilteredWorkers(workers); // Mostrar todos si no hay texto
    } else {
      const filtered = workers.filter((worker) =>
        worker.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredWorkers(filtered);
    }
  };

  const handleAttendance = async (workerId, status) => {
    try {
      const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
      
      // Buscar si ya existe un registro de asistencia para ese trabajador y fecha
      const querySnapshot = await getDocs(collection(FIRESTORE_DB, "attendance"));
      const existingAttendance = querySnapshot.docs.find((doc) => {
        const data = doc.data();
        return data.workerId === workerId && data.date === today; // Comparar fecha con el formato YYYY-MM-DD
      });
  
      if (existingAttendance) {
        alert("Ya se ha registrado la asistencia para hoy.");
        return;
      }
  
      // Si no existe, agregar nueva asistencia
      const attendanceCollectionRef = collection(FIRESTORE_DB, "attendance");
      await addDoc(attendanceCollectionRef, {
        workerId,
        status,
        date: today,
      });
  
      // Actualizar la lista de trabajadores en el estado local
      setWorkers((prevWorkers) => {
        const updatedWorkers = prevWorkers.map((worker) =>
          worker.id === workerId ? { ...worker, attendanceStatus: status } : worker
        );
        const sorted = [
          ...updatedWorkers.filter((w) => w.attendanceStatus === "Confirmada"),
          ...updatedWorkers.filter((w) => w.attendanceStatus === null),
          ...updatedWorkers.filter((w) => w.attendanceStatus === "Negada"),
        ];
        return sorted;
      });
  
      setFilteredWorkers((prevWorkers) => {
        const updatedFilteredWorkers = prevWorkers.map((worker) =>
          worker.id === workerId ? { ...worker, attendanceStatus: status } : worker
        );
        const sortedFiltered = [
          ...updatedFilteredWorkers.filter((w) => w.attendanceStatus === "Confirmada"),
          ...updatedFilteredWorkers.filter((w) => w.attendanceStatus === null),
          ...updatedFilteredWorkers.filter((w) => w.attendanceStatus === "Negada"),
        ];
        return sortedFiltered;
      });
  
      console.log("Asistencia registrada con éxito");
    } catch (error) {
      console.error("Error al registrar asistencia:", error);
    }
  };
  
  const renderWorker = ({ item }) => {
    const isConfirmed = item.attendanceStatus === "Confirmada";
    const isDenied = item.attendanceStatus === "Negada";
  
    return (
      <View
        style={[
          styles.workerCard,
          isConfirmed && styles.confirmedCard,
          isDenied && styles.deniedCard,
        ]}
      >
        <View style={styles.workerInfo}>
          <MaterialIcons name="person" size={28} color={isConfirmed ? "#4CAF50" : isDenied ? "#F44336" : "#aaa"} />
          <Text style={styles.workerName}>{item.name}</Text>
        </View>
  
        {item.attendanceStatus === null ? (
          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={[styles.statusButton, styles.confirmButton]}
              onPress={() => handleAttendance(item.id, "Confirmada")}
            >
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.statusButton, styles.denyButton]}
              onPress={() => handleAttendance(item.id, "Negada")}
            >
              <Text style={styles.buttonText}>Negar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text
            style={[styles.statusText, isConfirmed ? styles.confirmedText : styles.deniedText]}
          >
            {isConfirmed ? "Asistencia Confirmada" : "Asistencia Negada"}
          </Text>
        )}
      </View>
    );
  };
  

  const renderSection = (title, workers) => (
    <>
      {workers.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <FlatList
            data={workers}
            keyExtractor={(item) => item.id}
            renderItem={renderWorker}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      )}
    </>
  );

  const confirmedWorkers = filteredWorkers.filter(
    (worker) => worker.attendanceStatus === "Confirmada"
  );
  const pendingWorkers = filteredWorkers.filter(
    (worker) => worker.attendanceStatus === null
  );
  const deniedWorkers = filteredWorkers.filter(
    (worker) => worker.attendanceStatus === "Negada"
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Pase de Lista</Text>
          <Text style={styles.date}>{currentDate}</Text>

          {/* Cuadro de búsqueda con ícono */}
          <View style={styles.searchContainer}>
            <MaterialIcons
              name="search"
              size={24}
              color="#aaa"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar trabajador..."
              value={searchText}
              onChangeText={handleSearch}
            />
          </View>

          {/* Renderizar trabajadores por estado */}
          {renderSection("✅ Confirmados", confirmedWorkers)}
          {renderSection("⏳ Pendientes", pendingWorkers)}
          {renderSection("❌ Negados", deniedWorkers)}

          {/* Menú lateral */}
          <MenuLateral navigation={navigation} />
          {/* Barra de navegación inferior */}
          <BottomNavigationBar navigation={navigation} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    backgroundColor: "#fff",
  },
  title: {
    marginTop: height * 0.08,
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#333",
    marginBottom: height * 0.01,
    textAlign: "center",
  },
  date: {
    fontSize: width * 0.045,
    color: "#555",
    textAlign: "center",
    marginBottom: height * 0.02,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: height * 0.02,
    backgroundColor: "#fff",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  section: {
    marginBottom: height * 0.02,
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#333",
    marginBottom: height * 0.01,
  },
  listContainer: {
    flexGrow: 1,
  },
  workerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: width * 0.04,
    marginBottom: height * 0.01,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  workerText: {
    fontSize: width * 0.045,
    flex: 1,
  },
  button: {
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    borderRadius: 10,
    marginLeft: width * 0.02,
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
  },
  denyButton: {
    backgroundColor: "#F44336",
  },
  confirmedStatusButton: {
    backgroundColor: "#2196F3",
  },
  deniedStatusButton: {
    backgroundColor: "#9E9E9E",
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.035,
    fontWeight: "bold",
  },
  workerCard: {
    backgroundColor: "#f9f9f9",
    padding: width * 0.04,
    marginBottom: height * 0.015,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  confirmedCard: {
    borderColor: "#4CAF50",
    backgroundColor: "#E8F5E9", // Fondo verde claro para confirmados
  },

  deniedCard: {
    borderColor: "#F44336",
    backgroundColor: "#FFEBEE", // Fondo rojo claro para negados
  },

  workerInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  workerName: {
    marginLeft: 10,
    fontSize: width * 0.045,
    fontWeight: "600",
    color: "#333",
    flexShrink: 1,
  },

  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statusButton: {
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.04,
    borderRadius: 8,
  },

  statusText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: width * 0.04,
  },

  confirmedText: {
    color: "#2E7D32", // Color verde para confirmados
  },

  deniedText: {
    color: "#C62828", // Color rojo para negados
  },

  confirmButton: {
    backgroundColor: "#4CAF50",
  },

  denyButton: {
    backgroundColor: "#F44336",
  },

  buttonText: {
    color: "#fff",
    fontSize: width * 0.035,
    fontWeight: "bold",
  },
});

export default Lista;
