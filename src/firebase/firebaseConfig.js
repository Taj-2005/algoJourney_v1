// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "Your Api Key",
  authDomain: "Youe Auth domain",
  projectId: "Your Project Id",
  storageBucket: "Your Storage Bucket",
  messagingSenderId: "Your Msg Id",
  appId: "Your App Id",
  measurementId: "Your measurement id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default app;
export { auth, db };
