import { useState, useEffect, useCallback, useContext } from "react";
import { auth, provider } from "../styles/utils/firebase";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { AuthContext } from "../contexts/authContext";

export default function useAuth() {
  const { setUser } = useContext(AuthContext);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      setIsAuthenticating(false);
    })
    return () => unSubscribe();
  }, [setUser])

  const handleLogin = useCallback(async () => {
    try {
      setIsAuthenticating(true);
      const user = await signInWithPopup(auth, provider);
      setUser(user?.user);
      setIsAuthenticating(false);
    } catch (err) {
      console.error(err);
    }
  }, [setUser]);

  const handleSignOut = useCallback(async () => {
    await signOut(auth);
    setUser(null);
  }, [setUser]);

  return { handleLogin, handleSignOut, isAuthenticating };
}

