import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import MenuLateral from "../../components/Slidebar";
import BottomNavigationBar from "../../components/BottomNavigationBar";
import useWorkerDetails from "../../viewmodels/workers/workerDetailViewModel";

const { height } = Dimensions.get("window");

const WorkerDetails = ({ route, navigation }) => {
  const worker = route.params?.worker;

  if (!worker) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se encontró información del trabajador.</Text>
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <Text style={styles.goBackText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { attendanceData, loading, handleGenerateReport } = useWorkerDetails(worker);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Trabajador</Text>

      <ScrollView contentContainerStyle={styles.card}>
        <View style={styles.profileSection}>
          <Image
            source={worker.profilePhoto ? { uri: worker.profilePhoto } : require("../../assets/default-profile.png")}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraIcon}>
            <FontAwesome name="camera" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.name}>{worker.name}</Text>
          <Text style={styles.detail}>
            <FontAwesome name="phone" size={14} color="#e91e63" /> {worker.phone}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.reportButton}
          onPress={handleGenerateReport}
          disabled={loading}
        >
          <Text style={styles.reportButtonText}>
            {loading ? "Generando..." : "Generar Reporte de Asistencia"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <MenuLateral navigation={navigation} />
      <BottomNavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: height * 0.05,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    alignItems: "center",
  },
  profileSection: {
    position: "relative",
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#14ae5c",
    borderRadius: 15,
    padding: 5,
  },
  infoSection: {
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  detail: {
    fontSize: 16,
    color: "#555",
    marginBottom: 6,
  },
  reportButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "100%",
  },
  reportButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
  goBackButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 5,
  },
  goBackText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default WorkerDetails;
