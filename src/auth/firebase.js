// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration (from your project settings)
const firebaseConfig = {
  apiKey: "AIzaSyD1_4-k6rH1l-01oH8X-tDKGvhob0mpOY8",
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
