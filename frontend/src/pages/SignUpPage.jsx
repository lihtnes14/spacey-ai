import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email && !password) {
      alert("Please enter email and password.");
      return;
    } else if (!email) {
      alert("Please enter your email.");
      return;
    } else if (!password) {
      alert("Please enter your password.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully.");
      navigate("/"); // Navigate back to login page after signup
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered. Please login or use another email.");
      } else if (error.code === "auth/invalid-email") {
        alert("Please enter a valid email address.");
      } else if (error.code === "auth/weak-password") {
        alert("Password should be at least 6 characters.");
      } else {
        alert("Failed to sign up: " + error.message);
      }
      console.error(error);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign Up</h2>
        <form onSubmit={handleSignUp} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            style={styles.input}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            style={styles.input}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={styles.loginButton}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    justifyContent: "center",
    alignItems: "center",
    background: "#1e1e1e",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    background: "#0e0e10",
    padding: 32,
    borderRadius: 12,
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
    outline: "none",
  },
  loginButton: {
    padding: 12,
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};

export default SignUpPage;
