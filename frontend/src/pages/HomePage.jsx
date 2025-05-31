import React from "react";
import Particles from "../components/Home/Particles"; // ensure this path is correct
import Button from "react-bootstrap/Button";
import { auth } from "../firebase"; // your firebase config
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          backgroundColor: "#000",
        }}
      >
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          fontFamily: "'Orbitron', sans-serif",
        }}
      >
        {/* Top-right Logout button */}
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
          }}
        >
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* Header */}
        <h1
          style={{
            fontSize: "5rem",
            fontWeight: "900",
            textShadow:
              "0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff, 0 0 40px #0ff",
            animation: "glow 2s ease-in-out infinite alternate",
            letterSpacing: "2px",
            marginBottom: "20px",
          }}
        >
          SPACEY AI
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: "300",
            color: "#ccc",
            marginBottom: "30px",
          }}
        >
          Explore the universe of learning with intelligence.
        </p>

        {/* Lessons Button */}
        <Button
          variant="outline-info"
          size="lg"
          style={{ fontWeight: "600", padding: "12px 24px" }}
          onClick={() => navigate("/lesson")}
        >
          Click here to go to the lesson
        </Button>
      </div>

      {/* Glow animation & font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600..900&display=swap');

        @keyframes glow {
          from {
            text-shadow: 0 0 5px #0ff, 0 0 10px #0ff;
          }
          to {
            text-shadow: 0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff;
          }
        }
      `}</style>
    </>
  );
};

export default HomePage;
