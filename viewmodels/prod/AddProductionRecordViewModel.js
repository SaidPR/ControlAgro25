import { useState, useEffect } from "react";
import { Alert } from "react-native";
import ProductionViewModel from "./ProductionViewModel";
import ProductionRecord from "../../models/ProductionModel";

const useAddProductionRecordViewModel = (navigation, route) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(route.params?.record?.name || "");
  const [boxes, setBoxes] = useState(route.params?.record?.boxes?.toString() || "");
  const [buckets, setBuckets] = useState(route.params?.record?.buckets?.toString() || "");

  useEffect(() => {
    ProductionViewModel.fetchConfirmedUsers()
      .then(setUsers)
      .catch((error) => Alert.alert("Error", error.message));
  }, []);

  const handleSaveRecord = async () => {
    if (!selectedUser || !boxes || !buckets) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    const parsedBoxes = parseInt(boxes, 10);
    const parsedBuckets = parseInt(buckets, 10);

    if (isNaN(parsedBoxes) || isNaN(parsedBuckets) || parsedBoxes < 0 || parsedBuckets < 0) {
      Alert.alert("Error", "Cajas y baldes deben ser números válidos.");
      return;
    }

    const record = new ProductionRecord(
      route.params?.record?.id || null,
      selectedUser,
      route.params?.record?.date || new Date().toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      parsedBoxes,
      parsedBuckets
    );

    try {
      await ProductionViewModel.saveRecord(record, route.params?.record);
      navigation.goBack();
    } catch (error) {
      if (error !== "Actualización cancelada") {
        Alert.alert("Error", error.message);
      }
    }
  };

  return {
    users,
    selectedUser,
    setSelectedUser,
    boxes,
    setBoxes,
    buckets,
    setBuckets,
    handleSaveRecord,
  };
};

export default useAddProductionRecordViewModel;
