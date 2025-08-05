// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdFNuPuLHivrzrnWerJAcjMew1Tg3tbeo",
  authDomain: "ibapss.firebaseapp.com",
  projectId: "ibapss",
  storageBucket: "ibapss.firebasestorage.app",
  messagingSenderId: "1099223358022",
  appId: "1:1099223358022:web:8f81e7f3308c88d4438847"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);