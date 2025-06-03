import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import * as Network from 'expo-network';
import { Alert, Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  try {
    let token = null;

    if (!Device.isDevice) {
      Alert.alert('Simulador detectado', 'Las notificaciones push solo funcionan en dispositivos físicos.');
      return null;
    }

    const net = await Network.getNetworkStateAsync();
    if (!net.isConnected) {
      console.log("🔌 Sin conexión a Internet. No se puede registrar para notificaciones.");
      return null;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Permiso denegado', 'No se pueden recibir notificaciones push.');
      return null;
    }

    // Canal obligatorio en Android
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const pushToken = await Notifications.getExpoPushTokenAsync();
    token = pushToken.data;
    console.log('📨 Token Expo Push:', token);

    return token;
  } catch (error) {
    console.log('❌ Error al registrar notificaciones:', error);
    return null;
  }
}

export function listenForNotifications() {
  const subscription = Notifications.addNotificationReceivedListener(notification => {
    console.log('🔔 Notificación recibida:', notification);
  });

  return () => {
    subscription.remove();
  };
}

// Función para lanzar una notificación local de prueba
export async function sendLocalNotification() {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🚀 Notificación de prueba',
        body: 'Esta es una notificación local enviada desde la app.',
        sound: 'default',
      },
      trigger: { seconds: 2 },
    });
  } catch (error) {
    console.log('❌ Error al enviar notificación local:', error);
  }
}
