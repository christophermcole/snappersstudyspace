import React, { useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../library/firebase"; 

const GoogleAuth = ({ onSignIn = () => {} }) => { // Default function to prevent crashes
  useEffect(() => {
    const storedToken = localStorage.getItem("googleAccessToken");
    if (storedToken) {
      onSignIn(storedToken); // Auto-login if token exists
    }
  }, [onSignIn]); // Ensure useEffect runs when `onSignIn` changes

  const handleSignIn = async () => {
    try {
      if (!auth || !googleProvider) {
        throw new Error("Firebase authentication is not initialized.");
      }

      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      if (!token) {
        throw new Error("No access token received.");
      }

      localStorage.setItem("googleAccessToken", token);
      onSignIn(token);
    } catch (error) {
      console.error("Sign-in error:", error.message);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default GoogleAuth;
