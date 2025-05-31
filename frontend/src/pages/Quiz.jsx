import React, { useState } from 'react';
import Particles from '../components/Home/Particles'; // Ensure correct path

const quizData = [
  {
    question: "What is the body of a satellite like?",
    options: ["A spaceship", "A little box where all the parts go", "A rocket engine"],
    correct: "A little box where all the parts go",
  },
  {
    question: "What do solar panels do for the satellite?",
    options: ["Make it fly faster", "Let it talk to Earth", "Give it power using sunlight"],
    correct: "Give it power using sunlight",
  },
  {
    question: "What does the camera or sensor on a satellite do?",
    options: ["Take a nap", "See and feel things like eyes and noses", "Play games"],
    correct: "See and feel things like eyes and noses",
  },
  {
    question: "What part of the satellite is like its brain?",
    options: ["The computer", "The antenna", "The battery"],
    correct: "The computer",
  },
  {
    question: "What does the antenna help the satellite do?",
    options: ["Dance in space", "Send messages to Earth", "Eat space snacks"],
    correct: "Send messages to Earth",
  },
];

const QuizPage = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [score, setScore] = useState(0);

  const handleSelect = (questionIndex, option) => {
    if (!submitted) {
      setAnswers({ ...answers, [questionIndex]: option });
    }
  };

  const handleSubmit = () => {
    const unanswered = quizData.some((_, i) => !answers.hasOwnProperty(i));
    if (unanswered) {
      setError("🚨 Please answer all questions before submitting.");
      return;
    }

    let newScore = 0;
    quizData.forEach((q, i) => {
      if (answers[i] === q.correct) newScore += 1;
    });

    setScore(newScore);
    setError("");
    setSubmitted(true);
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setError("");
    setScore(0);
  };

  const getOptionStyle = (qIndex, option) => {
    if (!submitted) {
      return answers[qIndex] === option ? styles.selectedOption : styles.option;
    }

    const isCorrect = option === quizData[qIndex].correct;
    const isChosen = answers[qIndex] === option;

    if (isCorrect) return styles.correctOption;
    if (isChosen && !isCorrect) return styles.incorrectOption;
    return styles.option;
  };

  const renderFeedback = () => {
    const percentage = (score / quizData.length) * 100;
    let message = "";
    let color = "";
    let badge = "";

    if (percentage === 100) {
      message = " You're a space superstar! Perfect score!";
      color = "#22c55e";
      badge = "🥇";
    } else if (percentage >= 80) {
      message = " Awesome job, cadet! You're ready for space!";
      color = "#3b82f6";
      badge = "🥈";
    } else if (percentage >= 50) {
      message = " Good effort! You're learning fast!";
      color = "#facc15";
      badge = "🥉";
    } else {
      message = "👨‍🚀 Keep going, little explorer. You'll get there!";
      color = "#f87171";
      badge = "🔄";
    }

    return (
      <div style={{ ...styles.feedbackContainer, borderColor: color }}>
        <h2 style={{ ...styles.feedbackText, color }}>{badge} {message}</h2>
        <p style={{ fontSize: "16px" }}>Score: {score} / {quizData.length}</p>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {/* Particle Background */}
      <div style={styles.particleWrapper}>
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
      </div>

      {/* Foreground Content */}
      <div style={styles.content}>
        <h1 style={styles.heading}>🚀 Drakop's Space Quiz</h1>
        <p style={styles.subheading}>Let's See What You Remember!</p>

        {/* Feedback & Retry */}
        {submitted && (
          <>
            {renderFeedback()}
            <button style={styles.retryButton} onClick={handleRetry}>
              🔁 Try Again
            </button>
          </>
        )}

        {/* Questions */}
        {quizData.map((q, index) => (
          <div key={index} style={styles.questionBlock}>
            <h2 style={styles.question}>{index + 1}. {q.question}</h2>
            {q.options.map((option, optIndex) => (
              <div
                key={optIndex}
                style={getOptionStyle(index, option)}
                onClick={() => handleSelect(index, option)}
              >
                {option}
              </div>
            ))}
          </div>
        ))}

        {/* Submit Button or Completion Note */}
        {!submitted ? (
          <>
            {error && <p style={styles.error}>{error}</p>}
            <button style={styles.button} onClick={handleSubmit}>
              Submit Answers
            </button>
          </>
        ) : (
          <p style={styles.resultNote}>✅ Quiz complete! Review your answers above.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    width: '300%',
    backgroundColor: '#000',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '40px',
  },
  particleWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 0,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    maxWidth: '900px',
    padding: '0 20px',
    color: '#fff',
    fontFamily: 'sans-serif',
  },
  heading: {
    fontSize: '36px',
    marginBottom: '10px',
  },
  subheading: {
    fontSize: '18px',
    marginBottom: '30px',
  },
  feedbackContainer: {
    padding: '20px',
    border: '2px solid',
    borderRadius: '12px',
    marginBottom: '20px',
    backgroundColor: '#111',
    textAlign: 'center',
  },
  feedbackText: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  questionBlock: {
    marginBottom: '30px',
  },
  question: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  option: {
    padding: '10px 15px',
    backgroundColor: '#222',
    borderRadius: '8px',
    marginBottom: '8px',
    cursor: 'pointer',
    border: '1px solid #444',
  },
  selectedOption: {
    padding: '10px 15px',
    backgroundColor: '#3b82f6',
    borderRadius: '8px',
    marginBottom: '8px',
    cursor: 'pointer',
    border: '1px solid #60a5fa',
  },
  correctOption: {
    padding: '10px 15px',
    backgroundColor: '#16a34a',
    borderRadius: '8px',
    marginBottom: '8px',
    border: '1px solid #22c55e',
    color: '#fff',
  },
  incorrectOption: {
    padding: '10px 15px',
    backgroundColor: '#dc2626',
    borderRadius: '8px',
    marginBottom: '8px',
    border: '1px solid #f87171',
    color: '#fff',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  retryButton: {
    padding: '10px 20px',
    fontSize: '14px',
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  resultNote: {
    fontSize: '16px',
    color: '#00ffcc',
    marginTop: '20px',
  },
  error: {
    color: '#f87171',
    marginBottom: '10px',
  },
};

export default QuizPage;
