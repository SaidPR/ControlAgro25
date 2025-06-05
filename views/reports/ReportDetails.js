import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import MenuLateral from "../../components/Slidebar";
import BottomNavigationBar from "../../components/BottomNavigationBar";
import useDetailsReportsViewModel from "../../viewmodels/reports/ReportDetViewModel";

const { height } = Dimensions.get("window");

const DetailsReports = ({ route, navigation }) => {
  const { report } = route.params;
  const { formatDate, handleDeleteReport, error } = useDetailsReportsViewModel(navigation, report);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{report.title}</Text>
        {/* Validar y mostrar la fecha */}
        <Text style={styles.date}>{formatDate(report.date)}</Text>
        <Text style={styles.description}>{report.description}</Text>

        {/* Mostrar las asistencias */}
        <Text style={styles.subTitle}>Asistencias:</Text>
        {report.attendance && report.attendance.length > 0 ? (
          report.attendance.map((attendance, index) => (
            <View key={index} style={styles.attendanceItem}>
              <Text style={styles.attendanceText}>
                {formatDate(attendance.date)} - {attendance.status}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noAttendance}>No hay registros de asistencia.</Text>
        )}

        {/* Botón para eliminar el reporte */}
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteReport}>
          <Text style={styles.deleteButtonText}>Eliminar Reporte</Text>
        </TouchableOpacity>

        {error && <Text style={styles.errorText}>{error}</Text>}
      </ScrollView>

      {/* Barra lateral */}
      <MenuLateral navigation={navigation} />

      {/* Menú inferior */}
      <BottomNavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: height * 0.12,
  },
  title: {
    marginTop: 60,
    marginBottom: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  date: {
    fontSize: 18,
    color: "#7f8c8d",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#34495e",
    marginBottom: 20,
    marginTop: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  attendanceItem: {
    marginBottom: 10,
  },
  attendanceText: {
    fontSize: 16,
    color: "#2980b9",
  },
  noAttendance: {
    fontSize: 16,
    color: "#e74c3c",
  },
  deleteButton: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: "#e74c3c",
    borderRadius: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default DetailsReports;
