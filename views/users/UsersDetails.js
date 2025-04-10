import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MenuLateral from "../../components/Slidebar";
import BottomNavigationBar from "../../components/BottomNavigationBar";
import { useUserDetailsViewModel } from "../../viewmodels/users/UserDetailsViewModel";

const { width, height } = Dimensions.get("window");

const UsersDetails = ({ route, navigation }) => {
  const user = route.params?.user;
  const { deleteUser, goToEditUser } = useUserDetailsViewModel(navigation);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.name}</Text>

      {/* Detalles del usuario */}
      {Object.keys(user).map((key) => {
        if (key !== 'id' && key !== 'profilePhoto') {
          return (
            <View key={key} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{key.toUpperCase()}:</Text>
              <Text style={styles.detailValue}>{user[key]}</Text>
            </View>
          );
        }
        return null;
      })}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#3498db' }]}
        onPress={() => goToEditUser(user)}
      >
        <Text style={styles.buttonText}>Editar Información</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => deleteUser(user.id)}
      >
        <Text style={styles.buttonText}>Eliminar Usuario</Text>
      </TouchableOpacity>

      <MenuLateral navigation={navigation} />
      <BottomNavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    marginTop: height * 0.08,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#333',
  },
  detailValue: {
    color: '#666',
  },
  button: {
    width: "100%",
    paddingVertical: height * 0.02,
    backgroundColor: "#e74c3c",
    borderRadius: 10,
    alignItems: "center",
    marginTop: height * 0.02,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default UsersDetails;