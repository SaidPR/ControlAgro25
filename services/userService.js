import { collection, query, where, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../services/firebaseConfig";
import { getAuth } from "firebase/auth";

export async function fetchCurrentUserData() {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("No hay usuario autenticado");
  }

  const userEmail = currentUser.email;

  const usersCollection = collection(FIRESTORE_DB, "users");
  const q = query(usersCollection, where("email", "==", userEmail));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.warn("No se encontró el usuario en Firestore con email:", userEmail);
    return null;
  }

  // Asumimos que solo hay 1 usuario con ese email
  const userDoc = querySnapshot.docs[0];
  return userDoc.data();
}
