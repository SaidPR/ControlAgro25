import * as Network from 'expo-network';

export const startNetworkMonitoring = async () => {
  try {
    const netState = await Network.getNetworkStateAsync();

    if (netState.isConnected) {
      console.log('✅ Conexión activa: la app tiene acceso a Internet.');
    } else {
      console.log('📴 Sin conexión: algunas funciones estarán limitadas.');
    }

  } catch (error) {
    console.log('❌ Error al verificar el estado de red:', error);
  }
};
