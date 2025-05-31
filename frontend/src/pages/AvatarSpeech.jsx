import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import videoFile from '../assets/leo.mp4'; // Make sure the file exists at this path

const VideoPlayer = () => {
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();

  const handleVideoEnd = () => {
    // ✅ Navigate to the quiz intro page after video ends
    navigate('/quiz-intro');
  };

  return (
    <div style={styles.container}>
      {showVideo ? (
        <ReactPlayer
          url={videoFile}
          playing
          controls
          width="100%"
          height="100%"
          onEnded={handleVideoEnd}
        />
      ) : (
        <div style={styles.center}>
          <p style={styles.text}>Welcome to the Satellite Lesson</p>
          <button onClick={() => setShowVideo(true)} style={styles.button}>
            Play Video
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'black',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  text: {
    color: 'white',
    fontSize: '24px',
    marginBottom: '20px',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default VideoPlayer;
