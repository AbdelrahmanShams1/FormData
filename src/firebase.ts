// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtavYnI9TNKfwxDm2cwFuLoxsgdTcNU8s",
  authDomain: "nafany2-589de.firebaseapp.com",
  projectId: "nafany2-589de",
  storageBucket: "nafany2-589de.firebasestorage.app",
  messagingSenderId: "440873274458",
  appId: "1:440873274458:web:2236ff7a246bdcd45a1c63",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
