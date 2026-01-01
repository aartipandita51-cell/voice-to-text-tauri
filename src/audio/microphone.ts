let mediaRecorder: MediaRecorder | null = null;
let audioStream: MediaStream | null = null;
let audioChunks: Blob[] = [];

export async function startMicrophone() {
  audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

  audioChunks = [];
  mediaRecorder = new MediaRecorder(audioStream);

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      audioChunks.push(event.data);
    }
  };

  mediaRecorder.start();
}

export function stopMicrophone(): Promise<Blob> {
  return new Promise((resolve) => {
    if (!mediaRecorder) {
      console.error("❌ MediaRecorder is null");
      return;
    }

    mediaRecorder.onstop = () => {
      console.log("🎤 MediaRecorder stopped");
      console.log("🎤 Audio chunks count:", audioChunks.length);

      const audioBlob = new Blob(audioChunks, {
        type: "audio/webm",
      });

      console.log("🎧 Audio blob size:", audioBlob.size);

      audioStream?.getTracks().forEach((track) => track.stop());
      mediaRecorder = null;

      resolve(audioBlob);
    };

    mediaRecorder.stop();
  });
}

