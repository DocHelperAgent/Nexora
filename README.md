# 🤖 Nexora: 3D AI Sourcing Assistant

Nexora is an interactive 3D AI agent designed for the **CoCreate Pitch 2026** competition. She serves as a futuristic interface for the Alibaba.com ecosystem, combining advanced 3D visuals with voice interaction and AI-driven sourcing logic.

## 🌟 Key Features

- **Sleek 3D Avatar**: A humanoid AI model built with Three.js, featuring glossy materials and glowing "Nexora-style" accents.
- **Voice Interaction (STT & TTS)**:
    - **Speech-to-Text (STT)**: Click the 🎤 button to talk to Nexora.
    - **Text-to-Speech (TTS)**: Nexora responds with a synthesized voice (via the Kitten TTS API).
- **AI Brain**: Integrated with a custom n8n webhook for dynamic, context-aware conversations.
- **Synchronized Animations**: Nexora's head, eyes, and power core animate in sync with her speech.
- **Futuristic Environment**: A dark office scene with reflective floors, glowing grids, and holographic tori.

## 📂 Project Structure

- `index.html`: The main web page and UI overlay.
- `app.js`: The core logic for Three.js, AI integration, and animations.
- `style.css`: Visual styling for the chat and UI elements.
- `PITCH_STRATEGY.md`: A detailed pitch script and roadmap for the competition.

## 🚀 How to Run

1.  **Open `index.html`**: Simply open this file in any modern web browser (Chrome or Edge recommended for STT support).
2.  **Interact**:
    - Type your message in the chat box and press **Enter**.
    - Or click the **🎤 icon** to speak directly.
3.  **Permissions**: Make sure to allow microphone access in your browser when prompted.

## 🛠️ Technical Details

- **Engine**: Three.js (r128)
- **AI Endpoint**: `https://dongle036-n8n.dochelper.org/webhook/ken`
- **TTS Endpoint**: `https://kitten.dochelper.org/synthesize`
- **STT**: Web Speech API (Nativ browser support)

## 📈 Roadmap for CoCreate Pitch
See [PITCH_STRATEGY.md](PITCH_STRATEGY.md) for the full business vision and technical expansion plan.
