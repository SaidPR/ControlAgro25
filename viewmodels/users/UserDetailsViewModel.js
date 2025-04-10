import { Alert } from 'react-native';
import { deleteDoc, doc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../services/firebaseConfig';

export const useUserDetailsViewModel = (navigation) => {
  const deleteUser = async (userId) => {
    try {
      await deleteDoc(doc(FIRESTORE_DB, 'users', userId));
      Alert.alert('Éxito', 'Usuario eliminado correctamente.');
      navigation.goBack();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      Alert.alert('Error', 'No se pudo eliminar el usuario.');
    }
  };

  const goToEditUser = (user) => {
    navigation.navigate('UserEdit', { user });
  };

  return {
    deleteUser,
    goToEditUser,
  };
};