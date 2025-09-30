import { useState, useEffect, useCallback } from "react";
import { auth, provider } from "../styles/utils/firebase";
import { onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      setIsAuthenticating(false);
    })
    return () => unSubscribe();
  }, [])

  const handleLogin = useCallback(async () => {
    try {
      setIsAuthenticating(true);
      const user = await signInWithPopup(auth, provider);
      setUser(user?.user);
      setIsAuthenticating(false);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    await signOut(auth);
    setUser(null);
  }, []);

  return { user, handleLogin, handleSignOut, isAuthenticating };
}

