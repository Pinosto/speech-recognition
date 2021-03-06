import { useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./App.css";
import microPhoneIcon from "./mic.svg";

function App() {
  const commands = [
    {
      command: "haku *",
      callback: (keywords) => {
        window.open("https://duckduckgo.com/?q=" + keywords + "&t=h_&ia=web");
      },
    },
    {
      command: "kuva *",
      callback: (keywords) => {
        window.open("https://duckduckgo.com/?q=" + keywords + "&t=h_&iax=images&ia=images");
      },
    },
    {
      command: "video *",
      callback: (keywords) => {
        window.open("https://duckduckgo.com/?q=" + keywords + "&t=h_&iax=videos&ia=videos");
      },
    },
    {
      command: "open *",
      callback: (website) => {
        window.open("http://" + website.split(" ").join(""));
      },
    },
    {
      command: "change background colour to *",
      callback: (color) => {
        document.body.style.background = color;
      },
    },
    {
      command: "stop",
      callback: () => {
        handleStop();
      },
    },
    {
      command: "reset",
      callback: () => {
        handleReset();
      },
    },
    {
      command: "reset background colour",
      callback: () => {
        document.body.style.background = `rgba(0, 0, 0, 0.8)`;
      },
    },
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }

  const handleListing = () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };

  const handleStop = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };

  const handleReset = () => {
    handleStop();
    resetTranscript();
  };

  return (
    <div className="microphone-wrapper">
      <div className="mircophone-container">
        <div
          className="microphone-icon-container"
          ref={microphoneRef}
          onClick={handleListing}
        >
          <img src={microPhoneIcon} alt="mic" className="microphone-icon" />
        </div>
        <div className="microphone-status">
          {isListening ? "Listening........." : "Click to start Listening"}
        </div>
        {isListening && (
          <button className="microphone-stop btn" onClick={handleStop}>
            Stop
          </button>
        )}
      </div>
      {transcript && (
        <div className="microphone-result-container">
          <div className="microphone-result-text">{transcript}</div>
          <button className="microphone-reset btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default App;