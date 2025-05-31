import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Page imports
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import AvatarSpeech from "./pages/AvatarSpeech";
import QuizIntroPage from "./pages/QuizIntroPage";
import Quiz from "./pages/Quiz"; // ✅ Quiz Component
import FeedbackPage from "./pages/Feedback"; // ✅ Import FeedbackPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/lesson" element={<AvatarSpeech />} />
        <Route path="/quiz-intro" element={<QuizIntroPage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/feedback" element={<FeedbackPage />} /> {/* ✅ Feedback Route */}
      </Routes>
    </Router>
  );
}

export default App;
