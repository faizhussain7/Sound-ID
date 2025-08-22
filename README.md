<div align="center">
  <img width="150" height="150" alt="download" src="https://github.com/user-attachments/assets/3b39d500-8d72-4a14-ac1f-eea5ff1b0c87" />
  <h1>SoundID</h1>
  <h3>🎶 Identify Any Song Or Audio Instantly with AI</h3>

  [![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev)
  [![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

  <p><strong>🚀 Fast • 📱 Cross-Platform</strong></p>
  <a href="https://expo.dev/artifacts/eas/i9o4xUc5P4JSMnZBbaBJZM.apk">
    <img src="https://img.shields.io/badge/Download-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Download on Device"/>
  </a>
</div>

---

## ✨ Why SoundID?

SoundID uses AI to identify songs in seconds. Upload any audio file, and get accurate song details on any device.

### Key Features
- **AI-Powered Recognition**: Powered by Google’s Gemini AI for precise audio analysis.
- **Multiple Formats**: Supports MP3, WAV, M4A, FLAC, and more (up to 15MB).
- **Cross-Platform**: Works on iOS, Android, and Web.
- **Smooth Experience**: Features animations (React Native Reanimated), haptic feedback, and dark/light mode.
- **Fast Processing**: Real-time results with minimal wait time.

### Perfect For
Music enthusiasts, DJs, and content creators who want to identify songs effortlessly.

---

## 🚀 Get Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

### Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/faizhussain7/Sound-ID/
   cd sound-identifier
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Run the App**
   ```bash
   npx expo start
   ```
   - **Mobile**: Scan QR code with Expo Go.
   - **Android**: Press `a` for emulator.
   - **iOS**: Press `i` for simulator.
   - **Web**: Press `w` for browser.

---

## 🎵 How to Use

1. **Launch SoundID**: Open the app and grant file access.
2. **Select Audio**: Choose an audio file (MP3, WAV, etc.).
3. **Wait for AI**: Watch animations while the AI processes.
4. **View Results**: See song details and metadata.

**Supported Formats**: MP3, WAV, M4A, FLAC, and more (up to 15MB).

---

## 🛠 Tech Stack

### Core
- **React Native 0.79.5**: Cross-platform framework.
- **Expo SDK 53**: Simplified development and deployment.
- **TypeScript**: Type-safe code.
- **Expo Router**: File-based navigation.

### UI & Animations
- **Tailwind CSS / NativeWind**: Utility-first styling.
- **React Native Reanimated**: Smooth animations.

### AI
- **Google Gemini AI**: Audio recognition.
- **Custom API**: Seamless AI integration.

### Tools
- **ESLint & Prettier**: Code quality and formatting.
- **Expo CLI**: Streamlined development workflow.

---

## 📁 Project Structure

```
SoundID/
├── app/                    # App screens and routing (Expo Router)
│   ├── (tabs)/            # Tab navigation
│   │   ├── _layout.tsx    # Tab layout
│   │   ├── index.tsx      # Home screen (audio upload)
│   │   └── settings.tsx   # Settings screen
│   ├── _layout.tsx        # Root layout and styles
│   ├── result.tsx         # Song details screen
│   └── developer-info.tsx # Developer info screen
├── components/            # Reusable UI components
│   └── ui/               # UI library (Button, Card, etc.)
├── contexts/             # React contexts
│   └── AppContext.tsx    # Global state (theme, loading)
├── services/             # API and external services
│   └── geminiApi.ts      # Gemini AI integration
├── types/                # TypeScript types
│   └── Song.ts           # Song data types
├── assets/               # Static assets
│   ├── fonts/            # Custom fonts
│   └── images/           # App icons and images
└── config files          # Project configurations
```

---

### Environment variables

Create a `.env` file in the project root with your Gemini API key:

```bash
EXPO_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

Then restart the dev server after any change to `.env`.

### Commands
- `npm start`: Start Expo server.
- `npm run android`: Run on Android emulator.
- `npm run ios`: Run on iOS simulator.
- `npm run web`: Run in browser.
- `npm run lint`: Check code quality.

### Setup
1. **Install Tools**: Node.js (18+), Expo CLI, and Git.
2. **Get API Key**: Obtain Google Gemini AI key from [Google AI Studio](https://aistudio.google.com/).
3. **Optional**: Set up Android Studio (Android) or Xcode (iOS) for native testing.

---

## 🤝 Contributing

1. Fork the repository.
2. Create a branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m 'Add your feature'`.
4. Push: `git push origin feature/your-feature`.
5. Open a Pull Request.

---

## 📞 Support

- **Email**: mfaizhussain7@gmail.com
