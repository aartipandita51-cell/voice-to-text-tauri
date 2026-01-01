export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const response = await fetch("http://localhost:3001/transcribe", {
    method: "POST",
    body: audioBlob,
  });

  const data = await response.json();
  return data.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";
}
