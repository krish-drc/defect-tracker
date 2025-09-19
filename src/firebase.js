// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";    
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgb9nfFJbBCh_mm-6L2dOtMspvpFguC4A",
  authDomain: "defect-tracker-e5862.firebaseapp.com",
  projectId: "defect-tracker-e5862",
  storageBucket: "defect-tracker-e5862.firebasestorage.app",
  messagingSenderId: "52085565459",
  appId: "1:52085565459:web:3591b03a96c48aa63b77e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
