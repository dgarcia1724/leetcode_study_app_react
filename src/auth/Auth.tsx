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
  const navigate = useNavigate();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed up:", user);
        navigate("/"); // Navigate to home page after successful sign up
      })
      .catch((error) => console.error("Error signing up:", error));
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User logged in:", user);
        navigate("/"); // Navigate to home page after successful login
      })
      .catch((error) => console.error("Error logging in:", error));
  };

  return (
    <div className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1877f2]"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1877f2]"
      />
      <button
        onClick={handleLogin}
        className="w-full bg-[#1877f2] text-white py-3 rounded-md font-bold hover:bg-[#166fe5]"
      >
        Log In
      </button>
      <button
        onClick={handleSignUp}
        className="w-full bg-[#42b72a] text-white py-3 rounded-md font-bold hover:bg-[#36a420]"
      >
        Create New Account
      </button>
    </div>
  );
}

export default Auth;
