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
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import BottomNavigationBar from "../../components/BottomNavigationBar";

const { width, height } = Dimensions.get("window");

const Lista = ({ navigation }) => {
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Obtener la fecha actual
    const date = new Date();
    const formattedDate = date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);

    // Obtener la lista de trabajadores
    const fetchWorkers = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(FIRESTORE_DB, "users")
        );
        const workersData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.role === "TRABAJADOR") {
            workersData.push({ id: doc.id, ...data, attendanceStatus: null });
          }
        });
        setWorkers(workersData);
        setFilteredWorkers(workersData); // Inicializar la lista filtrada
      } catch (error) {
        console.error("Error al obtener trabajadores:", error);
      }
    };

    fetchWorkers();
  }, []);

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
      // Actualizar el estado local
      setWorkers((prevWorkers) =>
        prevWorkers.map((worker) =>
          worker.id === workerId
            ? { ...worker, attendanceStatus: status }
            : worker
        )
      );

      // Guardar el registro en Firebase
      const attendanceCollectionRef = collection(FIRESTORE_DB, "attendance");
      await addDoc(attendanceCollectionRef, {
        workerId,
        status,
        date: new Date().toISOString(),
      });

      console.log("Asistencia registrada con éxito");
    } catch (error) {
      console.error("Error al registrar asistencia:", error);
    }
  };

  const renderWorker = ({ item }) => {
    return (
      <View style={styles.workerContainer}>
        <Text style={styles.workerText}>{item.name}</Text>
        {item.attendanceStatus === null ? (
          <>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={() => handleAttendance(item.id, "Confirmada")}
            >
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.denyButton]}
              onPress={() => handleAttendance(item.id, "Negada")}
            >
              <Text style={styles.buttonText}>Negar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={[
              styles.button,
              item.attendanceStatus === "Confirmada"
                ? styles.confirmedStatusButton
                : styles.deniedStatusButton,
            ]}
          >
            <Text style={styles.buttonText}>
              {item.attendanceStatus === "Confirmada"
                ? "Asistencia Confirmada"
                : "Asistencia Negada"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

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

          <FlatList
            data={filteredWorkers}
            keyExtractor={(item) => item.id}
            renderItem={renderWorker}
            contentContainerStyle={styles.listContainer}
          />
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
});

export default Lista;