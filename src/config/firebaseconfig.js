// firebase/config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js'; 

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtM_goU8lIGuN4CBH9vQWLtyss1S8ZOiY",
  authDomain: "indrive-app-d64cc.firebaseapp.com",
  projectId: "indrive-app-d64cc",
  storageBucket: "indrive-app-d64cc.firebasestorage.app",
  messagingSenderId: "540581053701",
  appId: "1:540581053701:web:29e2a9be47c271cc48e36c",
  measurementId: "G-R45S0MF706"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


