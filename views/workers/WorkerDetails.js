import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Dimensions } from "react-native";
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
      <View style={styles.profileSection}>
        <Image
          source={worker.profilePhoto ? { uri: worker.profilePhoto } : require("../../assets/default-profile.png")}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.cameraIcon}>
          <FontAwesome name="camera" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{worker.name}</Text>
      <Text style={styles.detail}>📞 {worker.phone}</Text>
      <Text style={styles.detail}>📍 {worker.location}</Text>

      <TouchableOpacity style={styles.reportButton} onPress={handleGenerateReport} disabled={loading}>
        <Text style={styles.reportButtonText}>Generar Reporte de Asistencia</Text>
      </TouchableOpacity>

      <MenuLateral navigation={navigation} />
      <BottomNavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
    alignItems: "center",
  },
  profileSection: {
    position: "relative",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#ccc",
    
    marginTop: height * 0.08,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#14ae5c",
    borderRadius: 15,
    padding: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 10,
    textAlign: "center",
  },
  reportButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#007bff",
    borderRadius: 10,
  },
  reportButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default WorkerDetails;