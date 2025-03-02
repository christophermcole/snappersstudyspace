import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyChbw1dM8PPD3QA9jmXA5siOn8OUz-qOqk",
    authDomain: "snappersstudyspace-a5cff.firebaseapp.com",
    projectId: "snappersstudyspace-a5cff",
    storageBucket: "snappersstudyspace-a5cff.firebasestorage.app",
    messagingSenderId: "372810280107",
    appId: "1:372810280107:web:2f44197aaa19966a095bee",
    measurementId: "G-QPVLEWHJER"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getFirestore(app);
export const googleProvider = new GoogleAuthProvider(app).addScope('email');

export default app