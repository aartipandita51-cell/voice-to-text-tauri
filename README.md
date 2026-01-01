# Voice-to-Text Desktop App (Tauri + Deepgram)

A cross-platform desktop application that converts speech into text using a push-to-talk workflow.  
Built as a functional clone of **Wispr Flow**, focusing on core voice-to-text functionality rather than UI polish.

This project demonstrates practical skills in building AI-powered desktop applications using **Tauri**, **React**, and **Deepgram**.

---

## ✨ Features

-  Push-to-Talk Voice Input  
-  Microphone Access & Audio Recording  
-  Speech-to-Text Transcription using Deepgram  
-  Transcribing Status Indicator  
-  Start / Stop Recording Controls  
-  Basic Error Handling  

---

##  Tech Stack

- **Tauri** – Cross-platform desktop framework  
- **React + TypeScript** – Frontend UI  
- **Vite** – Frontend build tool  
- **Deepgram API** – Speech-to-text transcription  
- **Node.js (Express server)** – Secure API proxy  

---

##  Architecture Overview

```
src/
 ├─ ui/              → React UI components
 ├─ audio/           → Microphone access & audio recording logic
 ├─ transcription/   → Deepgram API integration
server.js            → Backend proxy for Deepgram API
src-tauri/           → Native Tauri configuration
```

### Design Decisions

- Audio capture is isolated from UI logic  
- Transcription logic is separated for clarity  
- Deepgram API key is kept server-side  
- UI kept minimal to prioritize functionality  

---

## 🔐 API Key Security

The Deepgram API key is **not committed**.

Example `.env` file (ignored by Git):

```
DEEPGRAM_API_KEY=your_deepgram_api_key_here
```

---

##  How to Run Locally

Follow the steps below to clone and run the application on your local machine.
---

###  Clone the Repository

```bash
git clone https://github.com/aartipandita51-cell/voice-to-text-tauri.git
cd voice-to-text-tauri

---

##  Running the App

```bash
npm install
node server.js
npx tauri dev
```

---

##  User Flow

1. Start Recording  
2. Speak into microphone  
3. Stop Recording  
4. Audio sent to Deepgram  
5. Transcription displayed  

---
##  Demo Video

A demo video is included as part of the submission demonstrating the complete workflow:

Starting and stopping voice recording

Speaking into the microphone

Transcribed text appearing in the application

### Demo Video Link:
https://drive.google.com/drive/folders/1mWWFFDWwx6lZ8CQCb7_a3G_i2wCxUpWg?usp=drive_link


---
