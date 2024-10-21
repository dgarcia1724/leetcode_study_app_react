// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration (from your project settings)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // Use import.meta.env
  authDomain: "leetcode-study-app.firebaseapp.com",
  projectId: "leetcode-study-app",
  storageBucket: "leetcode-study-app.appspot.com",
  messagingSenderId: "136728763906",
  appId: "1:136728763906:web:f0d06e24df905c9541911b",
  measurementId: "G-P71KR21ZV9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Export auth for use in your app
