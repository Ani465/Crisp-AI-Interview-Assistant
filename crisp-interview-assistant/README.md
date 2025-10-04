# Crisp Interview Assistant

Crisp Interview Assistant is a modern, AI-powered web application designed to streamline and enhance the technical interview process for both interviewers and interviewees. It features real-time chat, resume parsing, candidate management, and intelligent question handling, all within a user-friendly interface.

## Features

- **AI-Powered Resume Parsing**: Automatically extract and analyze key information from uploaded resumes.
- **Real-Time Chat**: Seamless communication between interviewers and interviewees.
- **Candidate Management**: Track, score, and manage candidates efficiently.
- **Question Timer**: Keep interviews on track with built-in timers for each question.
- **Dynamic Question Handling**: Intelligent question selection and scoring.
- **User Roles**: Separate interfaces and features for interviewers and interviewees.
- **Modern UI**: Clean, responsive design built with React and Vite.

## Tech Stack

- **Frontend**: React, Vite
- **State Management**: Redux Toolkit
- **Styling**: CSS/SCSS (customizable)
- **Build Tools**: Vite
- **Linting**: ESLint

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Ani465/AI-Resume-Analyzer.git
   cd crisp-interview-assistant
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173) to view the app.

## Project Structure

```
crisp-interview-assistant/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── assets/
│   ├── components/
│   │   ├── TabsLayout.jsx
│   │   ├── Interviewee/
│   │   └── Interviewer/
│   ├── modals/
│   ├── store/
│   │   ├── persistConfig.js
│   │   ├── store.js
│   │   └── slices/
│   └── utils/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run preview` — Preview the production build
- `npm run lint` — Run ESLint

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License.

## Author

- [Ani465](https://github.com/Ani465)
