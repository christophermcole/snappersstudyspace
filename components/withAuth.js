import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext"; // Now this will work!

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/"); // Redirect to index page if not authenticated
      }
    }, [user, router]);

    if (!user) {
      return null; // Prevent rendering before redirect
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
