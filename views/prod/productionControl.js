import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import useProductionControlViewModel from "../../viewmodels/prod/ProductionControlViewModel";
import MenuLateral from "../../components/Slidebar";
import BottomNavigationBar from "../../components/BottomNavigationBar";

const { width, height } = Dimensions.get("window");

const ProductionControl = ({ navigation }) => {
  const { production, handleAddRecord } = useProductionControlViewModel(navigation);

  const renderProduction = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ProductionDetails", { record: item })}
    >
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.details}>Cajas: {item.boxes} | Cubetas: {item.buckets}</Text>
      </View>
      <Text style={styles.viewDetails}>Ver detalles</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Control de Producción</Text>
      <FlatList
        data={production}
        keyExtractor={(item) => item.id}
        renderItem={renderProduction}
        ListHeaderComponent={
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("AddProduction", { 
              onSave: handleAddRecord 
            })}
          >
            <Text style={styles.addButtonText}>+ Añadir Registro</Text>
          </TouchableOpacity>
        }
      />
      <MenuLateral navigation={navigation} />
      <BottomNavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4", padding: 10 },
  title: {
    marginTop: height * 0.08,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#555",
  },
  details: {
    fontSize: 14,
    color: "#333",
  },
  viewDetails: {
    marginTop: 10,
    color: "#007BFF",
    fontWeight: "bold",
    textAlign: "right",
  },
  addButton: {
    backgroundColor: "#34d058",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProductionControl;
