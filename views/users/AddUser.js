import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View, // Importamos View para el header y el card
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import useAddUserViewModel from "../../viewmodels/users/useAddUserViewModel";

const { width, height } = Dimensions.get("window");

const AddUser = ({ navigation }) => {
  const {
    formData,
    showDatePicker,
    handleInputChange,
    handleDateChange,
    handleRegistro,
    handleConfirmCode,
    setShowDatePicker,
    verificationCode,
    setVerificationCode,
    step,
  } = useAddUserViewModel(navigation);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header de la pantalla */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Registro de Usuario</Text>
        </View>

        {/* Contenedor principal del formulario/verificación */}
        <View style={styles.formCard}>
          {step === "form" ? (
            <>
              <Text style={styles.cardTitle}>Información Personal</Text>
              <TextInput
                placeholder="Primer Nombre"
                value={formData.primerNombre}
                onChangeText={(value) => handleInputChange("primerNombre", value)}
                style={styles.input}
                placeholderTextColor="#999" // Color para el placeholder
              />
              <TextInput
                placeholder="Segundo Nombre (Opcional)"
                value={formData.segundoNombre}
                onChangeText={(value) => handleInputChange("segundoNombre", value)}
                style={styles.input}
                placeholderTextColor="#999"
              />
              <TextInput
                placeholder="Primer Apellido"
                value={formData.primerApellido}
                onChangeText={(value) => handleInputChange("primerApellido", value)}
                style={styles.input}
                placeholderTextColor="#999"
              />
              <TextInput
                placeholder="Segundo Apellido (Opcional)"
                value={formData.segundoApellido}
                onChangeText={(value) => handleInputChange("segundoApellido", value)}
                style={styles.input}
                placeholderTextColor="#999"
              />
              <TextInput
                placeholder="Teléfono"
                value={formData.telefono}
                onChangeText={(value) => handleInputChange("telefono", value)}
                keyboardType="phone-pad"
                style={styles.input}
                placeholderTextColor="#999"
              />
              <TextInput
                placeholder="Correo Electrónico"
                value={formData.email}
                onChangeText={(value) => handleInputChange("email", value)}
                keyboardType="email-address"
                style={styles.input}
                placeholderTextColor="#999"
              />
              <TextInput
                placeholder="Contraseña"
                value={formData.password}
                onChangeText={(value) => handleInputChange("password", value)}
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#999"
              />
              <TextInput
                placeholder="CURP"
                value={formData.curp}
                onChangeText={(value) => handleInputChange("curp", value)}
                style={styles.input}
                placeholderTextColor="#999"
              />

              <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
                <Text style={formData.fechaNacimiento ? styles.dateButtonTextFilled : styles.dateButtonTextPlaceholder}>
                  {formData.fechaNacimiento || "Seleccionar Fecha de Nacimiento"}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}

              <TouchableOpacity style={styles.actionButton} onPress={handleRegistro}>
                <Text style={styles.buttonText}>Enviar Código de Verificación</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.cardTitle}>Verificación</Text>
              <Text style={styles.verificationText}>
                Hemos enviado un código a tu número de teléfono. Ingresa el código a continuación para verificar tu cuenta.
              </Text>
              <TextInput
                placeholder="Código de Verificación"
                value={verificationCode}
                onChangeText={setVerificationCode}
                keyboardType="number-pad"
                style={styles.input}
                placeholderTextColor="#999"
              />
              <TouchableOpacity style={styles.actionButton} onPress={handleConfirmCode}>
                <Text style={styles.buttonText}>Confirmar Código</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
    backgroundColor: "#f4f4f4", 
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: height * 0.05, 
  },
  header: {
    backgroundColor: "#0E8C47", 
    paddingTop: Platform.OS === 'ios' ? height * 0.06 : height * 0.03,
    paddingBottom: height * 0.04,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
    justifyContent: "flex-end",
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  headerTitle: {
    fontSize: width * 0.07, 
    fontWeight: "bold",
    color: "#fff",
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 15, 
    marginHorizontal: width * 0.05, 
    padding: width * 0.06, 
    marginTop: -height * 0.02, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: width * 0.055,
    fontWeight: "bold",
    color: "#333",
    marginBottom: height * 0.025,
    textAlign: 'center', 
  },
  input: {
    width: "100%",
    paddingVertical: height * 0.018, 
    paddingHorizontal: width * 0.04,
    borderWidth: 1,
    borderColor: "#e0e0e0", 
    borderRadius: 8, 
    backgroundColor: "#fcfcfc", 
    marginBottom: height * 0.02,
    fontSize: width * 0.04, 
    color: '#333',
  },
  dateButton: {
    width: "100%",
    paddingVertical: height * 0.018,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    backgroundColor: "#fcfcfc",
    alignItems: "flex-start", 
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.04,
  },
  dateButtonTextPlaceholder: {
    color: "#999", 
    fontSize: width * 0.04,
  },
  dateButtonTextFilled: {
    color: "#333", 
    fontSize: width * 0.04,
  },
  actionButton: {
    width: "100%",
    paddingVertical: height * 0.022, 
    backgroundColor: "#14ae5c", 
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.01, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.048,
    fontWeight: "bold",
  },
  verificationText: {
    fontSize: width * 0.042,
    color: "#555",
    textAlign: "center",
    marginBottom: height * 0.03,
    lineHeight: width * 0.06, 
  },
});

export default AddUser;