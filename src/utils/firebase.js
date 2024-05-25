import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Non sensitive firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCkAa6IzaKd3aurmn-c5T4EAdLEy7_9Spw",
  authDomain: "hyperlinked-4f0fc.firebaseapp.com",
  projectId: "hyperlinked-4f0fc",
  storageBucket: "hyperlinked-4f0fc.appspot.com",
  messagingSenderId: "556162679609",
  appId: "1:556162679609:web:8e82b20efa3a7aa974dee8",
  measurementId: "G-P0ZJS958WT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db, }
