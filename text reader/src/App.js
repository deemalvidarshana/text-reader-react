import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const TextReaderApp = () => {
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [text, setText] = useState('Enter text here...');
  const [voices, setVoices] = useState([]);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);

  useEffect(() => {
    const populateVoices = () => {
      setVoices(speechSynthesis.getVoices());
    };

    populateVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoices;
    }
  }, []);

  const handleSpeak = () => {
    if (!selectedVoice || !text) return;
    const speech = new SpeechSynthesisUtterance(text);
    speech.voice = voices.find(voice => voice.name === selectedVoice);
    speech.pitch = pitch;
    speech.rate = rate;
    window.speechSynthesis.speak(speech);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div className="App">
      <h1>Text Reader Application</h1>
      <br />
      <div className="dropdown-wrapper">
        <select
          onChange={(e) => setSelectedVoice(e.target.value)}
          value={selectedVoice}
        >
          {voices.map((voice, index) => (
            <option key={index} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
        <div className="dropdown-icon"></div>
      </div>
      <br />
      <textarea
        id="text-to-read"
        rows="10"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      Rate: <input type="range" min="0.1" max="2" value={rate} step="0.1" onChange={(e) => setRate(e.target.value)} />
      <br />
      Pitch: <input type="range" min="0" max="2" value={pitch} step="0.1" onChange={(e) => setPitch(e.target.value)} />
      <br />
      <br />
      <button id="read-button" onClick={handleSpeak}>Read Text</button>
      <button id="stop-button" onClick={handleStop}>Stop Reading</button>
    </div>
  );
};

export default TextReaderApp;
