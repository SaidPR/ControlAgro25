import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ImageBackground } from "react-native";
import BottomNavigationBar from "../../components/BottomNavigationBar";
import logo from "../../assets/Agro.webp";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../services/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const { width, height } = Dimensions.get("window");

export default function PantallaInicio({ navigation }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const user = FIREBASE_AUTH.currentUser;
      if (user) {
        try {
          const usersRef = collection(FIRESTORE_DB, "users");
          const q = query(usersRef, where("email", "==", user.email));
          const querySnapshot = await getDocs(q);
    
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            const firstName = userData.name?.split(" ")[0];
            setUserName(firstName || user.email); 
          } else {
            setUserName(user.email);
          }
        } catch (error) {
          console.error("Error obteniendo nombre de usuario:", error);
          setUserName(user.email);
        }
      }
    };
    
    fetchUserName();
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/menuBG.webp")}
      style={[styles.background]}
    >
      <View style={styles.contenedor}>
        <View style={styles.encabezado}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.textoEncabezado}>
            !Bienvenido de vuelta{userName ? `, ${userName}` : ""}!
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => navigation.navigate("Lista")}
          >
            <Text style={styles.buttonText}>Pase de Lista</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => navigation.navigate("UsersList")}
          >
            <Text style={styles.buttonText}>Administrar Usuarios</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => navigation.navigate("WorkersList")}
          >
            <Text style={styles.buttonText}>Gestión de Trabajadores</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => navigation.navigate("ProductionControl")}
          >
            <Text style={styles.buttonText}>Control de Producción</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => navigation.navigate("UsersList")}
          >
            <Text style={styles.buttonText}>Gestión de Reportes</Text>
          </TouchableOpacity>
        </View>

        <BottomNavigationBar navigation={navigation} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  encabezado: {
    backgroundColor: "#ffff",
    padding: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  textoEncabezado: {
    color: "#00000",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 0,
    padding: 20,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.02,
    marginBottom: height * 0.17,
  },
  button: {
    backgroundColor: "#A5D6A7",
    width: width * 0.8,
    paddingVertical: height * 0.02,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: height * 0.02,
    elevation: 4,
  },
  buttonText: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#113C12",
  },
  logo: {
    width: width * 0.6,
    height: width * 0.4,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 50,
  },
});
