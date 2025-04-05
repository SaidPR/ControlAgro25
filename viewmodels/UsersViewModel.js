import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { Alert, Linking } from "react-native";
import { FIRESTORE_DB } from "../services/firebaseConfig";
import UserModel from "../models/UserModel";

export default class UsersViewModel {
  constructor(setUsers, setFilteredUsers, setLoading) {
    this.setUsers = setUsers;
    this.setFilteredUsers = setFilteredUsers;
    this.setLoading = setLoading;
  }

  fetchUsers = async () => {
    this.setLoading(true);
    try {
      const usersCollection = collection(FIRESTORE_DB, "users");
      const querySnapshot = await getDocs(usersCollection);
      const usersList = querySnapshot.docs.map(doc => new UserModel({ id: doc.id, ...doc.data() }));
      this.setUsers(usersList);
      this.setFilteredUsers(usersList);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los usuarios");
      console.error(error);
    } finally {
      this.setLoading(false);
    }
  };

  uploadImageToFirebase = async (uri, userId) => {
    const storage = getStorage();
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `profilePhotos/${userId}`);
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  openCamera = async (user, setUsers) => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permiso requerido", "Se requiere acceso a la cámara.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      await this._updateProfileImage(result.assets[0].uri, user, setUsers);
    }
  };

  openGallery = async (user, setUsers) => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permiso requerido", "Se requiere acceso a la galería.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      await this._updateProfileImage(result.assets[0].uri, user, setUsers);
    }
  };

  _updateProfileImage = async (uri, user, setUsers) => {
    try {
      const imageURL = await this.uploadImageToFirebase(uri, user.id);
      const userDocRef = doc(FIRESTORE_DB, "users", user.id);
      await updateDoc(userDocRef, { profilePhoto: imageURL });
      setUsers(prev => prev.map(u => (u.id === user.id ? { ...u, profilePhoto: imageURL } : u)));
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la imagen.");
      console.error(error);
    }
  };

  handleSearch = (text, users, setFilteredUsers, setSearchText) => {
    setSearchText(text);
    if (text === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`).catch(() =>
      Alert.alert("Error", "No se pudo realizar la llamada")
    );
  };

  handleWhatsApp = (phone) => {
    Linking.openURL(`https://wa.me/${phone}`).catch(() =>
      Alert.alert("Error", "No se pudo abrir WhatsApp")
    );
  };
}
