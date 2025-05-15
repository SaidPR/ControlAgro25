import React, { useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import useAddProductionRecordViewModel from "../../viewmodels/prod/AddProductionRecordViewModel";
import MenuLateral from "../../components/Slidebar";
import BottomNavigationBar from "../../components/BottomNavigationBar";

const { width, height } = Dimensions.get("window");

const AddProduction = ({ navigation, route }) => {
  const {
    users,
    selectedUser,
    setSelectedUser,
    boxes,
    setBoxes,
    buckets,
    setBuckets,
    handleSaveRecord,
  } = useAddProductionRecordViewModel(navigation, route);

  useEffect(() => {
    navigation.setOptions({
      onSave: route.params?.onSave,
    });
  }, [navigation, route.params?.onSave]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {route.params?.record ? "Editar Registro de Producción" : "Añadir Registro de Producción"}
      </Text>

      <Text style={styles.label}>Selecciona un usuario:</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={selectedUser} onValueChange={setSelectedUser}>
          <Picker.Item label="Seleccionar usuario" value="" />
          {users.map((user) => (
            <Picker.Item key={user.id} label={user.name} value={user.name} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Cajas:</Text>
      <TextInput
        style={styles.input}
        placeholder="Cantidad de cajas"
        value={boxes}
        onChangeText={setBoxes}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Cubetas:</Text>
      <TextInput
        style={styles.input}
        placeholder="Cantidad de cubetas"
        value={buckets}
        onChangeText={setBuckets}
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        <Button title="Guardar" onPress={handleSaveRecord} />
        <Button title="Cancelar" onPress={() => navigation.goBack()} color="#aaa" />
      </View>
      <MenuLateral navigation={navigation} />
      <BottomNavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: height * 0.08,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AddProduction;