import React, { useState } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent.");
      navigate("/");
    } catch (error) {
      alert("Failed to send reset email.");
      console.error(error);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Reset Password</h2>
        <form onSubmit={handleReset} style={styles.form}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.loginButton}>
            Send Reset Email
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
  googleButton: {
    padding: 12,
    backgroundColor: "#fff",
    color: "#444",
    border: "1px solid #ddd",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontWeight: "500",
  },
  links: {
    marginTop: 8,
    display: "flex",
    justifyContent: "space-between",
  },
  link: {
    background: "none",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    fontSize: 14,
    padding: 0,
  },
};

export default ResetPasswordPage;
