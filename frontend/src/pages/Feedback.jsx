import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Particles from '../components/Home/Particles'; // adjust the path if needed

const FeedbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, badgeEarned } = location.state || {};

  const getFeedbackMessage = () => {
    if (score === total) return "🌟 Amazing! You got everything right!";
    if (score >= total * 0.7) return "🚀 Great job! You remember most things well.";
    if (score >= total * 0.4) return "🛰️ Not bad! A little review and you'll be a space pro!";
    return "👨‍🚀 It’s okay! Let’s try again and explore more together!";
  };

  const handleRetry = () => {
    navigate('/quiz'); // route to your quiz page
  };

  return (
    <div style={styles.container}>
      {/* Particle background */}
      <Particles
        particleColors={["#ffffff", "#00ffff"]}
        particleCount={100}
        particleSpread={10}
        speed={0.2}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />

      {/* Foreground content */}
      <div style={styles.content}>
        <h1 style={styles.heading}>🧠 Your Space Quiz Results</h1>
        <p style={styles.score}>You scored {score} out of {total}</p>
        <p style={styles.feedback}>{getFeedbackMessage()}</p>
        {badgeEarned && <p style={styles.badge}>🏅 You earned the <strong>Space Explorer Badge</strong>!</p>}
        <button style={styles.button} onClick={handleRetry}>Try Again</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#000',
    overflowY: 'auto',
    zIndex: 0,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    color: '#fff',
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  heading: {
    fontSize: '32px',
    marginBottom: '20px',
  },
  score: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  feedback: {
    fontSize: '18px',
    marginBottom: '20px',
  },
  badge: {
    fontSize: '20px',
    color: '#facc15',
    fontWeight: 'bold',
    marginBottom: '30px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#10b981',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default FeedbackPage;
