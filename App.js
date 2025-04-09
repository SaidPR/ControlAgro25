import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigation/navi';
import { registerForPushNotificationsAsync, listenForNotifications } from "./views/general/Notif";

const App = () => {
  useEffect(() => {
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