// Simple rubric-based scoring: 10 per question, weighted by difficulty
const weights = { Easy: 1, Medium: 1.25, Hard: 1.5 };

export function scoreAnswer(answerText, question, difficulty) {
  if (!answerText || answerText.trim().length === 0) return 0;
  const len = answerText.trim().split(/\s+/).length;
  // heuristic: longer & keyword hits => higher; cap at 10
  const keywords = (question.q.match(/[A-Za-z]+/g) || [])
    .slice(0, 3)
    .map((k) => k.toLowerCase());
  const hits = keywords.filter((k) =>
    answerText.toLowerCase().includes(k)
  ).length;
  const base = Math.min(10, Math.round((len / 25) * 6 + hits * 2));
  return Math.round(base * weights[difficulty]);
}

export function finalScore(perQuestion) {
  const total = perQuestion.reduce((a, b) => a + (b || 0), 0);
  return Math.min(
    100,
    Math.round(
      (total /
        (10 * 1 + 10 * 1 + 10 * 1.25 + 10 * 1.25 + 10 * 1.5 + 10 * 1.5)) *
        100
    )
  );
}

export function summarize(candidate, questions, answers, perQuestionScores) {
  const strengths = [];
  const areas = [];
  questions.forEach((q, i) => {
    const s = perQuestionScores[i] || 0;
    if (s >= 12) strengths.push(q.rubric[0] || "Depth");
    else areas.push(q.rubric[0] || "Clarity");
  });
  return `Candidate ${candidate.name || "Unknown"} shows strengths in ${
    Array.from(new Set(strengths)).join(", ") || "basics"
  }, with improvement areas in ${
    Array.from(new Set(areas)).join(", ") || "detail"
  }.`;
}
