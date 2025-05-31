import React, { useState, useEffect, useRef } from "react";
import Particles from "../components/Home/Particles";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { BsChatDotsFill } from "react-icons/bs";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const QuizIntroPage = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hi! Ask me anything about the video lesson." },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [speakingMsgIdx, setSpeakingMsgIdx] = useState(null);

  const recognitionRef = useRef(null);
  const utteranceRef = useRef(null);
  const selectedVoiceRef = useRef(null); // New: Holds selected female voice

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        setInput(speechToText);
        setIsListening(false);
      };

      recognition.onend = () => setIsListening(false);
      recognition.onerror = (err) => {
        console.error("Speech recognition error", err);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      console.warn("Speech Recognition not supported in this browser.");
    }

    const setFemaleVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(
        (voice) =>
          voice.lang.startsWith("en") &&
          (voice.name.toLowerCase().includes("female") ||
            voice.name.toLowerCase().includes("woman") ||
            voice.name.toLowerCase().includes("susan") || // Common female voice names
            voice.name.toLowerCase().includes("zira"))
      );
      if (femaleVoice) {
        selectedVoiceRef.current = femaleVoice;
      } else if (voices.length > 0) {
        selectedVoiceRef.current = voices[0]; // fallback
      }
    };

    // Load voices asynchronously
    window.speechSynthesis.onvoiceschanged = setFemaleVoice;
    setFemaleVoice();

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: input }]);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

      const data = await res.json();
      setMessages((prev) => [...prev, { from: "ai", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "Oops, something went wrong. Try again." },
      ]);
    }

    setInput("");
  };

  const toggleSpeakText = (text, idx) => {
    const synth = window.speechSynthesis;

    if (synth.speaking) {
      synth.cancel();
      setSpeakingMsgIdx(null);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      if (selectedVoiceRef.current) {
        utterance.voice = selectedVoiceRef.current;
      }
      utterance.onend = () => setSpeakingMsgIdx(null);
      utterance.onerror = () => setSpeakingMsgIdx(null);

      setSpeakingMsgIdx(idx);
      utteranceRef.current = utterance;
      synth.speak(utterance);
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
        }}
      >
        <h1 className="text-6xl font-extrabold">Ready for the Quiz?</h1>
        <p className="mt-4 text-xl">Let's test what you've learned!</p>

        <Button
          variant="outline-light"
          style={{ marginTop: 30 }}
          onClick={() => navigate("/quiz")}
        >
          Start Quiz
        </Button>

        <div
          onClick={() => setIsChatOpen(!isChatOpen)}
          style={{
            position: "fixed",
            bottom: 30,
            right: 30,
            zIndex: 100,
            backgroundColor: "#007bff",
            borderRadius: "50%",
            padding: "15px",
            cursor: "pointer",
            boxShadow: "0 0 10px rgba(0,123,255,0.7)",
          }}
          title={isChatOpen ? "Close chat" : "Open chat"}
        >
          <BsChatDotsFill size={28} color="#fff" />
        </div>

        {isChatOpen && (
          <div
            style={{
              position: "fixed",
              bottom: 90,
              right: 30,
              width: 350,
              height: 500,
              backgroundColor: "#111",
              color: "#fff",
              padding: 15,
              borderRadius: 12,
              boxShadow: "0 0 15px rgba(0,123,255,0.8)",
              zIndex: 101,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h4 style={{ marginBottom: 10 }}>AI Assistant</h4>

            <div
              style={{
                flexGrow: 1,
                overflowY: "auto",
                marginBottom: 10,
                fontSize: 14,
                lineHeight: 1.4,
              }}
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    marginBottom: 10,
                    textAlign: msg.from === "user" ? "right" : "left",
                  }}
                >
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "8px 12px",
                        borderRadius: 15,
                        backgroundColor:
                          msg.from === "user" ? "#007bff" : "#333",
                        color: msg.from === "user" ? "#fff" : "#ddd",
                        maxWidth: "80%",
                        wordWrap: "break-word",
                      }}
                    >
                      {msg.text}
                    </span>
                    {msg.from === "ai" && (
                      <button
                        onClick={() => toggleSpeakText(msg.text, idx)}
                        style={{
                          background: "none",
                          border: "none",
                          color: speakingMsgIdx === idx ? "#0f0" : "#ccc",
                          fontSize: 16,
                          cursor: "pointer",
                        }}
                        title={
                          speakingMsgIdx === idx
                            ? "Click to stop speaking"
                            : "Click to read aloud"
                        }
                      >
                        🔊
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input
                type="text"
                placeholder="Ask a question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 6,
                  border: "none",
                  fontSize: 14,
                  outline: "none",
                  backgroundColor: "#222",
                  color: "#fff",
                }}
                autoFocus
              />
              <button
                onClick={toggleListening}
                style={{
                  backgroundColor: isListening ? "#dc3545" : "#28a745",
                  border: "none",
                  padding: 10,
                  borderRadius: 6,
                  cursor: "pointer",
                }}
                title={isListening ? "Stop listening" : "Start listening"}
              >
                {isListening ? (
                  <FaMicrophoneSlash color="white" />
                ) : (
                  <FaMicrophone color="white" />
                )}
              </button>
            </div>

            <button
              onClick={sendMessage}
              style={{
                marginTop: 8,
                padding: "8px 12px",
                borderRadius: 6,
                border: "none",
                backgroundColor: "#007bff",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              disabled={!input.trim()}
            >
              Send
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default QuizIntroPage;
