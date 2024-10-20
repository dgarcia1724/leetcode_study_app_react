import { useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { AuthContext } from "../auth/AuthProvider"; // Use the context for global state

// Custom hook to retrieve auth context and handle Firebase auth state
export function useAuth() {
  const [loading, setLoading] = useState(true);
  const { user, uid } = useContext(AuthContext); // Get user and uid from the AuthProvider context

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, uid, loading };
}
