// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auth-mern-9b6cb.firebaseapp.com",
  projectId: "auth-mern-9b6cb",
  storageBucket: "auth-mern-9b6cb.appspot.com",
  messagingSenderId: "801255732103",
  appId: "1:801255732103:web:06e671747bb2473e79d922",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
