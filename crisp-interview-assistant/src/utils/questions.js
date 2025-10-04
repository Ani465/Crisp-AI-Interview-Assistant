export const QUESTION_BANK = {
  Easy: [
    {
      q: "Explain the difference between state and props in React.",
      rubric: ["Accuracy", "Clarity"],
    },
    {
      q: "What does npm run build do in a Vite React app?",
      rubric: ["Tooling", "Understanding"],
    },
    { q: "How do you create a REST endpoint in Express?", rubric: ["Basics"] },
  ],
  Medium: [
    {
      q: "Design a Redux state for managing an interview flow with timers.",
      rubric: ["Design", "Trade-offs"],
    },
    {
      q: "How would you implement pagination and search in a dashboard?",
      rubric: ["Algorithm", "UX"],
    },
    {
      q: "Explain React memoization (useMemo/useCallback) and when to use them.",
      rubric: ["Performance"],
    },
  ],
  Hard: [
    {
      q: "Outline a resilient local-first architecture using redux-persist and recovery.",
      rubric: ["Architecture"],
    },
    {
      q: "How do you secure a Node API with JWT and refresh tokens? Pitfalls?",
      rubric: ["Security", "Depth"],
    },
    {
      q: "Discuss scaling strategies for a React + Node app (caching, queues, CDNs).",
      rubric: ["Systems"],
    },
  ],
};

export function generate6() {
  // deterministic pick for demo; in real use, randomize without repeats
  return [
    QUESTION_BANK.Easy[0],
    QUESTION_BANK.Easy[1],
    QUESTION_BANK.Medium[0],
    QUESTION_BANK.Medium[1],
    QUESTION_BANK.Hard[0],
    QUESTION_BANK.Hard[1],
  ];
}

export function difficultyOf(index) {
  if (index < 2) return "Easy";
  if (index < 4) return "Medium";
  return "Hard";
}
