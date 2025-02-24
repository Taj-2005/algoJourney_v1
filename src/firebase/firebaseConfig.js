// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjAWH3vDBBPMDHWpUpv-SxcQeXESYmu4U",
  authDomain: "dsa-f76d8.firebaseapp.com",
  projectId: "dsa-f76d8",
  storageBucket: "dsa-f76d8.firebasestorage.app",
  messagingSenderId: "372213793866",
  appId: "1:372213793866:web:a75a209c75cb1bf4e552b3",
  measurementId: "G-R6JEE6GEH4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default app;
export { auth, db };
