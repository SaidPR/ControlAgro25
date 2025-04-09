import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Alert, Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Permiso denegado', 'No se pueden recibir notificaciones push.');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token);
  } else {
    Alert.alert('Error', 'Las notificaciones push solo funcionan en dispositivos físicos.');
  }

  return token;
}

export function listenForNotifications() {
  const subscription = Notifications.addNotificationReceivedListener(notification => {
    //console.log('Notificación recibida:', notification);
  });

  return () => subscription.remove();
}

export async function sendLocalNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🚀 Notificación de prueba',
      body: 'Esta es una notificación local en Expo!',
      sound: 'default',
    },
    trigger: { seconds: 2 },
  });
}