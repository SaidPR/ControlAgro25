import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  Dimensions,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import  useWorkersViewModel  from "../../viewmodels/workers/workerViewModel";
import MenuLateral from "../../components/Slidebar";
import BottomNavigationBar from "../../components/BottomNavigationBar";

const { width, height } = Dimensions.get("window"); 

const WorkersList = ({ navigation }) => {
  const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);
  
    const vm = new useWorkersViewModel(setUsers, setFilteredUsers, setLoading);
  
    useEffect(() => {
      vm.fetchUsers();
    }, []);
  
    const renderUserCard = ({ item }) => (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.profileSection}>
            <Image
              source={
                item.profilePhoto
                  ? { uri: item.profilePhoto }
                  : require("../../assets/default-profile.png")
              }
              style={styles.profileImage}
            />
            <TouchableOpacity
              style={styles.cameraIcon}
              onPress={() =>
                Alert.alert("Imagen de Perfil", "Selecciona una opción", [
                  { text: "Cámara", onPress: () => vm.openCamera(item, setUsers) },
                  { text: "Galería", onPress: () => vm.openGallery(item, setUsers) },
                  { text: "Cancelar", style: "cancel" },
                ])
              }
            >
              <FontAwesome name="camera" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
  
          <View style={styles.infoSection}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.details}>
              <MaterialIcons name="phone" size={14} color="#e91e63" /> {item.phone}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("WorkerDetails", { worker: item })}
            >
              <Text style={styles.detailsLink}>Ver detalles</Text>
            </TouchableOpacity>
          </View>
  
          <View style={styles.actions}>
            <TouchableOpacity style={styles.iconButton} onPress={() => vm.handleCall(item.phone)}>
              <FontAwesome name="phone" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => vm.handleWhatsApp(item.phone)}
            >
              <FontAwesome name="whatsapp" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Trabajadores</Text>
  
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color="#aaa" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar trabajador..."
            value={searchText}
            onChangeText={(text) =>
              vm.handleSearch(text, users, setFilteredUsers, setSearchText)
            }
          />
        </View>
      {/* Botón de Registrar Trabajador */}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate("AddWorker")}
      >
        <Text style={styles.registerButtonText}>+ Registrar Trabajador</Text>
      </TouchableOpacity>

  
        {loading ? (
          <Text style={styles.loadingText}>Cargando trabajadores...</Text>
        ) : (
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id}
            renderItem={renderUserCard}
            contentContainerStyle={styles.list}
          />
        )}
  
        <MenuLateral navigation={navigation} />
        <BottomNavigationBar navigation={navigation} />
      </View>
    );
  };

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f4f4f4", 
    padding: 10,    
  },
  title: {
    marginTop: height * 0.08,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10, 
    color: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10, 
    backgroundColor: "#fff",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  list: { 
    paddingBottom: 20 
  },
  loadingText: { 
    fontSize: 18, 
    textAlign: "center", 
    marginTop: 20 
  },
  registerButton: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileSection: { position: "relative" },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
  infoSection: { flex: 1, marginLeft: 15 },
  name: { fontSize: 18, fontWeight: "bold" },
  details: { fontSize: 14, color: "#555", marginTop: 5 },
  detailsLink: { fontSize: 14, color: "#3498db", marginTop: 5 },
  actions: { flexDirection: "row", alignItems: "center" },
  iconButton: {
    backgroundColor: "#34d058",
    borderRadius: 50,
    padding: 10,
    marginLeft: 10,
  },
});

export default WorkersList;