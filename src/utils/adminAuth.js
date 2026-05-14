import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { isAdminEmail } from "./adminEmails";

export const adminLogin = (email, password) =>
  signInWithEmailAndPassword(auth, email.trim(), password);

export const adminLogout = () => signOut(auth);

export const isAdminLoggedIn = () =>
  !!auth.currentUser &&
  isAdminEmail(auth.currentUser.email);
