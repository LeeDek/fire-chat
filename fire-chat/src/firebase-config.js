// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkcOuGKOHjU6b7t1jSxHHlntto3sshbVQ",
  authDomain: "leehisfirechat.firebaseapp.com",
  projectId: "leehisfirechat",
  storageBucket: "leehisfirechat.appspot.com",
  messagingSenderId: "427643449404",
  appId: "1:427643449404:web:93fbb5990675d156a29339",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
