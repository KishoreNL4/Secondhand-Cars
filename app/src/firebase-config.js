import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAXnKuGn5zXpEoSN_MzmddhVsBwnV41Ws",
  authDomain: "carsvalley-d80c0.firebaseapp.com",
  projectId: "carsvalley-d80c0",
  storageBucket: "carsvalley-d80c0.appspot.com",
  messagingSenderId: "596290992278",
  appId: "1:596290992278:web:96150a1a9375d122f3eab7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
