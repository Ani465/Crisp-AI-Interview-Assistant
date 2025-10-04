import { Card, Space, Typography, Button, Input } from "antd";
import ResumeUploadWithConfirmation from "./ResumeUploadWithConfirmation";
import MissingFieldsGate from "./MissingFieldsGate";
import QuestionTimer from "./QuestionTimer";
import { useDispatch, useSelector } from "react-redux";
import {
  startInterview,
  initTimer,
  nextQuestion,
  finish,
} from "../../store/slices/interviewSlice";
import {
  upsertInterview,
  recordAnswer,
  finalizeInterview,
} from "../../store/slices/candidatesSlice";
import { generate6, difficultyOf } from "../../utils/questions";
import { scoreAnswer, finalScore, summarize } from "../../utils/scoring";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const dispatch = useDispatch();
  const interview = useSelector((s) => s.interview);
  const candidates = useSelector((s) => s.candidates.list);
  const [bufferAnswer, setBufferAnswer] = useState("");
  const answerRef = useRef();

  const candidate = candidates.find(
    (c) => c.id === interview.activeCandidateId
  );

  const idx = interview.currentIndex;
  const q = candidate?.interview?.questions?.[idx];
  const t = interview?.timers?.[idx];
  const difficulty = difficultyOf(idx);

  function onResumeUpload(candidateId, fields) {
    dispatch(
      upsertInterview({ id: candidateId, patch: { questions: generate6() } })
    );
    dispatch({ type: "ui/setSelectedCandidate", payload: candidateId });
    dispatch({
      type: "ui/setWelcomeBack",
      payload: Boolean(localStorage.getItem("crisp-interview")),
    });
    dispatch({ type: "interview/resetSession" });
    dispatch({ type: "interview/startInterview", payload: { candidateId } });
    dispatch({ type: "interview/pause" });
  }

  function ensureGateComplete() {
    return !["name", "email", "phone"].some((k) => !candidate?.[k]);
  }

  function submitCurrent() {
    const score = scoreAnswer(bufferAnswer, q, difficulty);
    dispatch(
      recordAnswer({
        id: candidate.id,
        index: idx,
        answer: bufferAnswer,
        score,
      })
    );
    setBufferAnswer("");
    if (idx >= 5) {
      const fs = finalScore(candidate.interview.perQuestionScores);
      const sum = summarize(
        candidate,
        candidate.interview.questions,
        candidate.interview.answers,
        candidate.interview.perQuestionScores
      );
      dispatch(
        finalizeInterview({ id: candidate.id, finalScore: fs, summary: sum })
      );
      dispatch(finish());
    } else {
      dispatch(nextQuestion());
    }
  }

  useEffect(() => {
    if (!candidate) return;
    const questions = candidate.interview?.questions;
    if (!questions || questions.length === 0) return;
    if (!interview.timers?.[idx]) {
      dispatch(initTimer({ index: idx, difficulty }));
    }
  }, [candidate, interview.currentIndex]);

  useEffect(() => {
    if (!t || !candidate) return;
    if (
      (t.remainingMs || 0) === 0 &&
      candidate.interview?.answers?.[idx] == null
    ) {
      submitCurrent();
    }
  }, [t?.remainingMs]);

  // ✅ Hooks are now all called before this conditional render
  if (!candidate) {
    return <ResumeUploadWithConfirmation onReady={onResumeUpload} />;
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {!ensureGateComplete() ? (
        <Card>
          <MissingFieldsGate
            candidate={candidate}
            onComplete={() => dispatch({ type: "interview/resume" })}
          />
        </Card>
      ) : interview.stage !== "done" ? (
        <Card>
          <Typography.Text type="secondary">
            Difficulty: {difficulty}
          </Typography.Text>
          <Typography.Title level={5} style={{ marginTop: 8 }}>
            {q?.q || "Preparing question..."}
          </Typography.Title>
          {t && (
            <QuestionTimer remainingMs={t.remainingMs} duration={t.duration} />
          )}
          <Input.TextArea
            ref={answerRef}
            autoSize={{ minRows: 4, maxRows: 8 }}
            placeholder="Type your answer..."
            value={bufferAnswer}
            onChange={(e) => setBufferAnswer(e.target.value)}
          />
          <Space style={{ marginTop: 8 }}>
            <Button type="primary" onClick={submitCurrent} disabled={!q}>
              Submit
            </Button>
            <Button onClick={() => dispatch({ type: "interview/pause" })}>
              Pause
            </Button>
            <Button onClick={() => dispatch({ type: "interview/resume" })}>
              Resume
            </Button>
          </Space>
          <Typography.Text type="secondary">
            Question {idx + 1} of 6
          </Typography.Text>
        </Card>
      ) : (
        <Card>
          <Typography.Title level={5}>Interview complete</Typography.Title>
          <Typography.Paragraph>
            Final Score: {candidate.interview.finalScore}
          </Typography.Paragraph>
          <Typography.Paragraph>
            Summary: {candidate.interview.summary}
          </Typography.Paragraph>
          <Button
            type="primary"
            onClick={() => {
              dispatch({ type: "interview/resetSession" });
              dispatch({
                type: "interview/startInterview",
                payload: { candidateId: candidate.id },
              });
            }}
            style={{ marginBottom: 16 }}
          >
            Reattempt Interview
          </Button>
        </Card>
      )}
    </Space>
  );
}
