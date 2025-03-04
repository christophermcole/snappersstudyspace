import React, { useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../library/firebase"; // Ensure this import is correct

const GoogleAuth = ({ onSignIn }) => {
  useEffect(() => {
    const storedToken = localStorage.getItem("googleAccessToken");
    if (storedToken) {
      onSignIn(storedToken); // Auto-login if token exists
    }
  }, []);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider); // Ensure `auth` is defined
      const credential = result.credential;
      const token = credential.accessToken;

      if (!token) {
        throw new Error("No access token received.");
      }

      localStorage.setItem("googleAccessToken", token);
      onSignIn(token);
    } catch (error) {
      console.error("Sign-in error:", error);
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
