import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase"; // Assuming you have your Firebase initialization here

interface AuthContextProps {
  user: User | null;
  uid: string | null;
  loading: boolean;
}

// Export the AuthContext
export const AuthContext = createContext<AuthContextProps>({
  user: null,
  uid: null,
  loading: true, // Set default loading to true
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setUid(firebaseUser.uid); // Capture UID
      } else {
        setUser(null);
        setUid(null);
      }
      setLoading(false); // Set loading to false when auth check is complete
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, uid, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// You can still have a helper hook if you'd like to use it in multiple places
export const useAuth = () => useContext(AuthContext);
