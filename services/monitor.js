import NetInfo from "@react-native-community/netinfo";
import * as Notifications from "expo-notifications";

export const startNetworkMonitoring = () => {
  NetInfo.addEventListener(state => {
    const isConnected = state.isConnected;

    console.log(
      isConnected
        ? "🔌 Conexión a Internet restaurada"
        : "📴 Se perdió la conexión a Internet"
    );

    Notifications.scheduleNotificationAsync({
      content: {
        title: isConnected ? "Conectado" : "Sin conexión",
        body: isConnected
          ? "La app volvió a tener acceso a Internet"
          : "La app está sin conexión. Algunas funciones no estarán disponibles",
      },
      trigger: null,
    });
  });
};