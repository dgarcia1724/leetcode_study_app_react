// src/Auth.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./firebase";
import { useToast } from "../components/Toast/ToastProvider";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // New state for error messages
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSignUp = () => {
    setErrorMessage(""); // Clear previous error message
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed up:", user);
        showToast("Account created successfully!", "success"); // Add this line
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
            showToast("Failed to create account. Please try again.", "error"); // Add this line
        }
      });
  };

  const handleLogin = () => {
    setErrorMessage(""); // Clear previous error message
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User logged in:", user);
        showToast("Login successful!", "success");
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
            showToast("Login failed. Please try again.", "error");
        }
      });
  };

  const handleForgotPassword = () => {
    setErrorMessage(""); // Clear previous error message
    if (!email) {
      setErrorMessage("Please enter your email address.");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        showToast("Password reset email sent. Check your inbox.", "success");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            setErrorMessage("No user found with this email.");
            break;
          case "auth/invalid-email":
            setErrorMessage("Invalid email format.");
            break;
          default:
            setErrorMessage("Failed to send reset email. Please try again.");
            showToast("Failed to send reset email. Please try again.", "error");
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
      <button
        onClick={handleForgotPassword}
        className="w-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 py-2 rounded-md font-medium hover:bg-gray-300 dark:hover:bg-gray-500"
      >
        Forgot Password?
      </button>
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
}

export default Auth;
