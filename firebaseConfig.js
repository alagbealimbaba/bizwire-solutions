import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBuFJFBUNmhg0P-g8bz87RPMzPtl8tm7yo",
  authDomain: "papa-blog-website.firebaseapp.com",
  projectId: "papa-blog-website",
  storageBucket: "papa-blog-website.appspot.com",
  messagingSenderId: "950052242764",
  appId: "1:950052242764:web:f1686679de7f78205ebbe9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); 

export { db, auth };  