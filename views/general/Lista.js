import React, { useEffect } from "react";
import {
  View,
  Text,
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
import BottomNavigationBar from "../../components/BottomNavigationBar";
import useListaViewModel from "../../viewmodels/general/ListaViewModel";
import { TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get("window");

const Lista = ({ navigation }) => {
  const {
    workers,
    filteredWorkers,
    searchText,
    currentDate,
    fetchWorkers,
    handleSearch,
    handleAttendance,
  } = useListaViewModel();

  useEffect(() => {
    fetchWorkers();
  }, []);

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
