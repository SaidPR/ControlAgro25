import { useState, useEffect } from "react";
import { Alert } from "react-native";
import ProductionViewModel from "./ProductionViewModel";
import ProductionRecord from "../../models/ProductionModel";

const useAddProductionRecordViewModel = (navigation, route) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(route.params?.record?.name || "");
  const [boxes, setBoxes] = useState(route.params?.record?.boxes?.toString() || "");
  const [buckets, setBuckets] = useState(route.params?.record?.buckets?.toString() || "");
  const [onSave, setOnSave] = useState(() => route.params?.onSave);

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

    const record = new ProductionRecord(
      route.params?.record?.id || null,
      selectedUser,
      route.params?.record?.date || new Date().toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      parseInt(boxes, 10),
      parseInt(buckets, 10)
    );

    try {
      await ProductionViewModel.saveRecord(record, route.params?.record);
      if (onSave) onSave();
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
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