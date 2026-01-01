import { useState } from "react";
import { startMicrophone, stopMicrophone } from "../audio/microphone";
import { transcribeAudio } from "../transcription/deepgram";
const DEEPGRAM_API_KEY = "4df7ec24de04450db82b3434cb9bce1f161af57d";

function App() {
  console.log("App rendered");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);

  const startRecording = async () => {
    console.log("Start recording clicked");
    try {
      setError(null);
      setTranscript("");
      setIsRecording(true);
      await startMicrophone();
    } catch {
      setError("Microphone access denied");
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    console.log("Stop recording clicked");
    setIsRecording(false);
    setIsTranscribing(true);

    try {
      const audioBlob = await stopMicrophone();
      console.log("Audio blob received in UI:", audioBlob);

      const text = await transcribeAudio(audioBlob, DEEPGRAM_API_KEY);
      console.log("Deepgram transcript:", text);

      setTranscript(text || "(No speech detected)");
    } catch (err) {
      console.error(err);
      setError("Transcription failed");
    } finally {
      setIsTranscribing(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>🎤 Voice to Text</h2>

      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={startRecording}
          disabled={isRecording || isTranscribing}
          style={{ marginRight: "10px" }}
        >
          Start Recording
        </button>

        <button
          onClick={stopRecording}
          disabled={!isRecording || isTranscribing}
        >
          Stop Recording
        </button>
      </div>

      {/* Status message */}
      {isTranscribing && (
        <p style={{ color: "blue", marginTop: "8px" }}>Transcribing...</p>
      )}

      {/* Recording status */}
      <p>
        Status:{" "}
        {isRecording ? (
          <span style={{ color: "red" }}>Recording...</span>
        ) : (
          "Idle"
        )}
      </p>

      {/* Transcript textarea */}
      <textarea
        placeholder="Transcribed text will appear here..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        rows={10}
        style={{ width: "100%", marginTop: "10px" }}
      />

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default App;
