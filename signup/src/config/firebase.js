import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDKL0ICzZNzwtb4QVmm1f3bI7yc_MK_Q5Y",
    authDomain: "basic-auth-4b1ca.firebaseapp.com",
    projectId: "basic-auth-4b1ca",
    storageBucket: "basic-auth-4b1ca.appspot.com",
    messagingSenderId: "105312663218",
    appId: "1:105312663218:web:5ebd0f642929e6d921bbab",
    measurementId: "G-3RHYWT8CPY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);