import Navigation from './navigation/navi';
import { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { registerForPushNotificationsAsync, listenForNotifications } from "./views/general/Notif";
import { startNetworkMonitoring } from "./services/monitor";

const App = () => {
  useEffect(() => {
    startNetworkMonitoring(); // Inicia el monitoreo de la red
    registerForPushNotificationsAsync();
    const unsubscribe = listenForNotifications();
    return unsubscribe; // Para limpiar el listener cuando el componente se desmonte
  }, []);
  
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
};

export default App;