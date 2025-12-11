// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDz7qgHFT8D3PEXkSjPvwncoZbNmJaDgV0",
  authDomain: "smart-deals-app-99eb8.firebaseapp.com",
  projectId: "smart-deals-app-99eb8",
  storageBucket: "smart-deals-app-99eb8.firebasestorage.app",
  messagingSenderId: "481723202190",
  appId: "1:481723202190:web:860d0e8678d7d4f141a7df",
  measurementId: "G-11BJJW0MVN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)