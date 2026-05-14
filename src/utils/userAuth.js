import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";

export const registerUser = async (name, email, password) => {
  const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
  await updateProfile(cred.user, { displayName: name.trim() });
  return cred.user;
};

export const loginUser = async (email, password) => {
  const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
  return cred.user;
};

export const logoutUser = () => signOut(auth);

export const getCurrentUser = () => auth.currentUser;
