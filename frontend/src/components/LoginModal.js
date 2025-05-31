import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const handleGoogleLogin = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    alert("Logged in with Google successfully!");
  } catch (error) {
    console.error("Google login error:", error);
  }
};
