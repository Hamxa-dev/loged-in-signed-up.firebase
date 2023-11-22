


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBbYOiRTKtFC4deHC-khGs7yY1NyX5VjAs",
  authDomain: "sign-up-form-7d566.firebaseapp.com",
  projectId: "sign-up-form-7d566",
  storageBucket: "sign-up-form-7d566.appspot.com",
  messagingSenderId: "812671101792",
  appId: "1:812671101792:web:e358804662302e566fcc05",
  measurementId: "G-MENK4SQ6N0",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { collection, addDoc, getDocs, query, where  };