import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import useProductionDetailsViewModel from "../../viewmodels/prod/ProductionDetailsViewModel";
import MenuLateral from "../../components/Slidebar";
import BottomNavigationBar from "../../components/BottomNavigationBar";

const ProductionDetails = ({ route, navigation }) => {
  const { record } = route.params;
  const { handleEdit, handleDelete } = useProductionDetailsViewModel(navigation, record);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{record.name}</Text>
        <Text style={styles.date}>{record.date}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.detail}>Cajas: {record.boxes}</Text>
        <Text style={styles.detail}>Cubetas: {record.buckets}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editButtonText}>Editar registro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Eliminar registro</Text>
        </TouchableOpacity>
      </View>
            <MenuLateral navigation={navigation} />
            <BottomNavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    marginTop: 80,
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  date: {
    fontSize: 16,
    color: "#555",
  },
  details: {
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#34d058",
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProductionDetails;