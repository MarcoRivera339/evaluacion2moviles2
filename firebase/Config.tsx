// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDly8v_Km_naoOEfknj_X9fwL9SunZGcWo",
  authDomain: "mr-prueba.firebaseapp.com",
  databaseURL: "https://mr-prueba-default-rtdb.firebaseio.com",
  projectId: "mr-prueba",
  storageBucket: "mr-prueba.firebasestorage.app",
  messagingSenderId: "474142159361",
  appId: "1:474142159361:web:69b68ded5e920dffa44600"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);