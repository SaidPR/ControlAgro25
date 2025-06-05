import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Alert } from 'react-native';
import MenuLateral from "../../components/Slidebar";
import BottomNavigationBar from "../../components/BottomNavigationBar";
import { useUserDetailsViewModel } from "../../viewmodels/users/UserDetailsViewModel";

const { width, height } = Dimensions.get("window");

const UsersDetails = ({ route, navigation }) => {
  const user = route.params?.user;
  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: Datos de usuario no encontrados.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <Text style={styles.goButtonText}>Volver a la lista</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { deleteUser, goToEditUser } = useUserDetailsViewModel(navigation);

  const handleDeleteUser = () => {
    Alert.alert(
      "Confirmar Eliminación",
      `¿Estás seguro de que quieres eliminar a ${user.name}? Esta acción no se puede deshacer.`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => deleteUser(user.id),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const formatKey = (key) => {
    let formatted = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    switch (key) {
      case 'email':
        return 'Correo Electrónico';
      case 'phone':
        return 'Teléfono';
      case 'role':
        return 'Rol';
      case 'fechaNacimiento': 
        return 'Fecha de Nacimiento';
      default:
        return formatted;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Detalles del Usuario</Text>
        <Text style={styles.userName}>{user.name}</Text>
      </View>

      <ScrollView style={styles.detailsScrollView}>
        <View style={styles.detailsCard}>
          {Object.keys(user).map((key, index) => {
            if (key !== 'id' && key !== 'profilePhoto' && key !== 'name') {
              return (
                <View key={key} style={[styles.detailRow, index === Object.keys(user).length - 1 && styles.lastDetailRow]}>
                  <Text style={styles.detailLabel}>{formatKey(key)}:</Text>
                  <Text style={styles.detailValue}>{user[key]}</Text>
                </View>
              );
            }
            return null;
          })}
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => goToEditUser(user)}
          >
            <Text style={styles.buttonText}>Editar Información</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDeleteUser}
          >
            <Text style={styles.buttonText}>Eliminar Usuario</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <MenuLateral navigation={navigation} />
      <BottomNavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 10,
  },
  goBackButton: {
    marginTop: 20,
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  goButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    backgroundColor: '#0E8C47',
    paddingTop: height * 0.06,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'normal',
    marginBottom: 5,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
  detailsScrollView: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: -10, 
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lastDetailRow: {
    borderBottomWidth: 0, 
  },
  detailLabel: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: '#666',
    flex: 2,
    textAlign: 'right',
  },
  buttonsContainer: {
    paddingHorizontal: 0, 
    paddingBottom: 30,
  },
  actionButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  editButton: {
    backgroundColor: '#3498db',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UsersDetails;