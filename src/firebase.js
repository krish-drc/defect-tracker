// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";    
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQXqF3eUyltWIYtuq96wuGHnwsuLUYD10",
  authDomain: "project-refector.firebaseapp.com",
  projectId: "project-refector",
  storageBucket: "project-refector.firebasestorage.app",
  messagingSenderId: "564789809566",
  appId: "1:564789809566:web:0e6c00cb3d48a6d200c68f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
