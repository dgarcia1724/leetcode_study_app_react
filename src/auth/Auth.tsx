// src/Auth.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // New state for error messages
  const navigate = useNavigate();

  const handleSignUp = () => {
    setErrorMessage(""); // Clear previous error message
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed up:", user);
        navigate("/folders"); // Navigate to folders page after successful sign up
      })
      .catch((error) => {
        // Handle error messages based on Firebase error codes
        switch (error.code) {
          case "auth/email-already-in-use":
            setErrorMessage("This email is already in use.");
            break;
          case "auth/invalid-email":
            setErrorMessage("Invalid email format.");
            break;
          case "auth/weak-password":
            setErrorMessage("Password should be at least 6 characters.");
            break;
          default:
            setErrorMessage("Failed to create account. Please try again.");
        }
      });
  };

  const handleLogin = () => {
    setErrorMessage(""); // Clear previous error message
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User logged in:", user);
        navigate("/folders"); // Navigate to folders page after successful login
      })
      .catch((error) => {
        // Handle error messages based on Firebase error codes
        switch (error.code) {
          case "auth/user-not-found":
            setErrorMessage("No user found with this email.");
            break;
          case "auth/wrong-password":
            setErrorMessage("Incorrect password.");
            break;
          case "auth/invalid-email":
            setErrorMessage("Invalid email format.");
            break;
          default:
            setErrorMessage("Failed to log in. Please try again.");
        }
      });
  };

  return (
    <div className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1877f2] dark:focus:ring-[#3b82f6] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1877f2] dark:focus:ring-[#3b82f6] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />
      <button
        onClick={handleLogin}
        className="w-full bg-[#1877f2] dark:bg-[#3b82f6] text-white py-3 rounded-md font-bold hover:bg-[#166fe5] dark:hover:bg-[#2563eb]"
      >
        Log In
      </button>
      <button
        onClick={handleSignUp}
        className="w-full bg-[#42b72a] dark:bg-[#22c55e] text-white py-3 rounded-md font-bold hover:bg-[#36a420] dark:hover:bg-[#16a34a]"
      >
        Create New Account
      </button>
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
}

export default Auth;
