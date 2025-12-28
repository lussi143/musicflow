
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDGaY7WFhJ-VZTptU1F7FNr2Ix2CE0UMIo",
  authDomain: "musicflow-f772e.firebaseapp.com",
  projectId: "musicflow-f772e",
  storageBucket: "musicflow-f772e.firebasestorage.app",
  messagingSenderId: "149123332404",
  appId: "1:149123332404:web:07d6a4e6e679fc2a5c0d61",
  measurementId: "G-TV8EGJ7BH2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
