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
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Registro de Usuario</Text>

        {step === "form" ? (
          <>
            <TextInput
              placeholder="Primer nombre"
              value={formData.primerNombre}
              onChangeText={(value) => handleInputChange("primerNombre", value)}
              style={styles.input}
            />
            <TextInput
              placeholder="Segundo nombre"
              value={formData.segundoNombre}
              onChangeText={(value) => handleInputChange("segundoNombre", value)}
              style={styles.input}
            />
            <TextInput
              placeholder="Primer apellido"
              value={formData.primerApellido}
              onChangeText={(value) => handleInputChange("primerApellido", value)}
              style={styles.input}
            />
            <TextInput
              placeholder="Segundo apellido"
              value={formData.segundoApellido}
              onChangeText={(value) => handleInputChange("segundoApellido", value)}
              style={styles.input}
            />
            <TextInput
              placeholder="Teléfono"
              value={formData.telefono}
              onChangeText={(value) => handleInputChange("telefono", value)}
              keyboardType="phone-pad"
              style={styles.input}
            />
            <TextInput
              placeholder="Correo Electrónico"
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
              keyboardType="email-address"
              style={styles.input}
            />
            <TextInput
              placeholder="Contraseña"
              value={formData.password}
              onChangeText={(value) => handleInputChange("password", value)}
              secureTextEntry
              style={styles.input}
            />
            <TextInput
              placeholder="CURP"
              value={formData.curp}
              onChangeText={(value) => handleInputChange("curp", value)}
              style={styles.input}
            />
            <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
              <Text style={styles.dateButtonText}>
                {formData.fechaNacimiento || "Seleccionar Fecha de Nacimiento"}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker value={new Date()} mode="date" display="default" onChange={handleDateChange} />
            )}

            <TouchableOpacity style={styles.button} onPress={handleRegistro}>
              <Text style={styles.buttonText}>Enviar Código de Verificación</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              placeholder="Ingresa el código de verificación"
              value={verificationCode}
              onChangeText={setVerificationCode}
              keyboardType="number-pad"
              style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={handleConfirmCode}>
              <Text style={styles.buttonText}>Confirmar Código</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: width * 0.05,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#333",
    marginBottom: height * 0.02,
  },
  input: {
    width: "100%",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: height * 0.02,
  },
  dateButton: {
    width: "100%",
    paddingVertical: height * 0.02,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  dateButtonText: {
    color: "#333",
    fontSize: width * 0.045,
  },
  button: {
    width: "100%",
    paddingVertical: height * 0.02,
    backgroundColor: "#14ae5c",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
});

export default AddUser;
