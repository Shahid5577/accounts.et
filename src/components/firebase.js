// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHbaQPmdZLSq4OywpQqrhINGUwxK9iChM",
  authDomain: "login-auth-90bc8.firebaseapp.com",
  projectId: "login-auth-90bc8",
  storageBucket: "login-auth-90bc8.firebasestorage.app",
  messagingSenderId: "64154695851",
  appId: "1:64154695851:web:19b3d8ab417a3770971fee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export const storage = getStorage(app);
export default app;