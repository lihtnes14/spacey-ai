import React, { useState, useEffect } from "react";
import Particles from "../components/Home/Particles";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const styleSheet = document.styleSheets[0];

    // Insert text fadeIn animation
    const keyframesFadeIn = `
      @keyframes textFadeIn {
        0% { opacity: 0; transform: translateY(-20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
    `;
    styleSheet.insertRule(keyframesFadeIn, styleSheet.cssRules.length);

    // Insert glow animation
    const keyframesGlow = `
      @keyframes glow {
        from {
          text-shadow: 0 0 5px #0ff, 0 0 10px #0ff;
        }
        to {
          text-shadow: 0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff;
        }
      }
    `;
    styleSheet.insertRule(keyframesGlow, styleSheet.cssRules.length);
  }, []);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      alert("Email or password is incorrect.");
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch (error) {
      alert("Google login failed.");
      console.error(error);
    }
  };

  return (
    <>
      {/* Particle Background */}
      <div style={styles.particleBg}>
        <Particles
          particleColors={["#ffffff", "#00ffff"]}
          particleCount={180}
          particleSpread={15}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Centered Header */}
      <h1 style={styles.centeredHeader}>SPACEY AI</h1>

      {/* Login Container */}
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h2 style={styles.title}>Welcome Back</h2>
          <form onSubmit={handleEmailLogin} style={styles.form}>
            <input
              type="email"
              placeholder="Email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" style={styles.loginButton}>
              Log In
            </button>
          </form>

          <button onClick={handleGoogleLogin} style={styles.googleButton}>
            <FcGoogle size={22} style={{ marginRight: 10 }} />
            Sign in with Google
          </button>

          <div style={styles.links}>
            <button
              onClick={() => navigate("/reset-password")}
              style={styles.link}
            >
              Forgot Password?
            </button>
            <button onClick={() => navigate("/signup")} style={styles.link}>
              Create Account
            </button>
          </div>
        </div>
      </div>

      {/* Include Orbitron font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600..900&display=swap');
      `}</style>
    </>
  );
};

const styles = {
  particleBg: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 0,
    backgroundColor: "#0a0a0a",
  },
  centeredHeader: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    fontSize: "6rem",
    fontWeight: "900",
    color: "#0ff",
    zIndex: 2,
    userSelect: "none",
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: "2px",
    textShadow: "0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff, 0 0 40px #0ff",
    animation: "glow 2s ease-in-out infinite alternate",
  },
  wrapper: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    padding: 20,
  },
  card: {
    backdropFilter: "blur(10px)",
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 32,
    maxWidth: 400,
    width: "100%",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  title: {
    fontSize: 22,
    color: "#0ff",
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: "1.5px",
    textShadow: "0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff",
    animation: "glow 2s ease-in-out infinite alternate",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  input: {
    padding: "12px 16px",
    fontSize: 16,
    borderRadius: 8,
    border: "1px solid #444",
    backgroundColor: "#101010",
    color: "#f0f0f0",
    outline: "none",
    fontFamily: "'Orbitron', sans-serif",
  },
  loginButton: {
    padding: "12px",
    backgroundColor: "#1e90ff",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontFamily: "'Orbitron', sans-serif",
  },
  googleButton: {
    padding: "12px",
    backgroundColor: "#ffffff",
    color: "#333",
    border: "none",
    borderRadius: 8,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    cursor: "pointer",
    fontFamily: "'Orbitron', sans-serif",
  },
  links: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 14,
    marginTop: 10,
  },
  link: {
    background: "none",
    border: "none",
    color: "#00ffff",
    cursor: "pointer",
    textDecoration: "underline",
    padding: 0,
    fontFamily: "'Orbitron', sans-serif",
  },
};

export default LoginPage;
