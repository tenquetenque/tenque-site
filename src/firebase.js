import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ←追加！

const firebaseConfig = {
  apiKey: "AIzaSyBtV5Xrs5Xf1TJpffgmQ98mNdzP_BJoBIA",
  authDomain: "tenque-1cac3.firebaseapp.com",
  projectId: "tenque-1cac3",
  storageBucket: "tenque-1cac3.firebasestorage.app",
  messagingSenderId: "1076879562876",
  appId: "1:1076879562876:web:c8696bfbad259926d0d1f9"
};

const app = initializeApp(firebaseConfig);

// 👇これ追加（データベース）
export const db = getFirestore(app);