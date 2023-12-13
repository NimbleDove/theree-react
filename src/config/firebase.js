import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Add this import
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVgbSIgv6R3s_C4B3HoPdn6u-0GIBZiW0",
  authDomain: "matematikv2-c22cd.firebaseapp.com",
  projectId: "matematikv2-c22cd",
  storageBucket: "matematikv2-c22cd.appspot.com",
  messagingSenderId: "807109224652",
  appId: "1:807109224652:web:3444af4f5cd6bce5b27a69"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export  {auth , db};