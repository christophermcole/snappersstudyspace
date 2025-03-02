"use client";  // Ensure this runs on the client side

import React, { useEffect } from "react";
import "firebaseui/dist/firebaseui.css";
import { auth } from "../library/firebase";

const GoogleAuth = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import FirebaseUI dynamically on the client side
      import("firebaseui")
        .then((firebaseui) => {
          const ui =
            firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
          ui.start("#firebaseui-auth-container", {
            signInOptions: [
              {
                provider: "google.com",
                scopes: ["email"],
              },
            ],
            signInFlow: "popup",
          });
        })
        .catch((error) => console.error("FirebaseUI failed to load", error));
    }
  }, []);

  return (
    <div>
      <h2>Sign In</h2>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

export default GoogleAuth;
