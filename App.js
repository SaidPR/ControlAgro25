import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation/navi";
import { registerForPushNotificationsAsync, listenForNotifications } from "./views/general/Notif";
import { startNetworkMonitoring } from "./services/monitor";

const App = () => {
  useEffect(() => {
    const init = async () => {
      try {
        console.log("🌐 Iniciando monitoreo de red...");
        await startNetworkMonitoring();

        console.log("📲 Registrando notificaciones push...");
        await registerForPushNotificationsAsync();

        console.log("🔔 Configurando listener de notificaciones...");
        const unsubscribe = listenForNotifications();

        return () => {
          console.log("🧹 Limpiando listener de notificaciones...");
          unsubscribe();
        };
      } catch (error) {
        console.log("❌ Error en App useEffect:", error);
      }
    };

    init();
  }, []);

  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
};

export default App;
