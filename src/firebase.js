import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyARb_SMyhlpGdvHh_eoSv0EaG0gmCPtgTY",
  authDomain: "todo-list-4c1ac.firebaseapp.com",
  projectId: "todo-list-4c1ac",
  storageBucket: "todo-list-4c1ac.firebasestorage.app",
  messagingSenderId: "393480064436",
  appId: "1:393480064436:web:4bd59a29b037a3557af6e1",
  measurementId: "G-DXHM21Y02C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

export { db };
