import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider"; // Use the context for global state

// Custom hook to retrieve auth context and handle Firebase auth state
export function useAuth() {
  const { user, uid, loading } = useContext(AuthContext); // Get user, uid, and loading from the AuthProvider context

  return { user, uid, loading };
}
