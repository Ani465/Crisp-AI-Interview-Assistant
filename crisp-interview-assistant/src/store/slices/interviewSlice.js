import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
  activeCandidateId: null,
  stage: "resume", // 'resume' | 'gate' | 'questions' | 'done'
  currentIndex: 0,
  difficultyPlan: ["Easy", "Easy", "Medium", "Medium", "Hard", "Hard"],
  timers: {
    // per question: { duration, startedAt, remainingMs, paused }
  },
  startedAt: null,
  lastTick: null,
};

const durations = { Easy: 20000, Medium: 60000, Hard: 120000 };

const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    startInterview(state, action) {
      const { candidateId } = action.payload;
      state.activeCandidateId = candidateId;
      state.stage = "questions";
      state.currentIndex = 0;
      state.startedAt = dayjs().valueOf();
      state.lastTick = dayjs().valueOf();
    },
    initTimer(state, action) {
      const { index, difficulty } = action.payload;
      state.timers[index] = {
        duration: durations[difficulty],
        startedAt: dayjs().valueOf(),
        remainingMs: durations[difficulty],
        paused: false,
      };
    },
    tick(state) {
      const now = dayjs().valueOf();
      const delta = now - (state.lastTick ?? now);
      state.lastTick = now;
      const t = state.timers[state.currentIndex];
      if (t && !t.paused) t.remainingMs = Math.max(0, t.remainingMs - delta);
    },
    pause(state) {
      const t = state.timers[state.currentIndex];
      if (t) t.paused = true;
    },
    resume(state) {
      const t = state.timers[state.currentIndex];
      if (t) t.paused = false;
      state.lastTick = dayjs().valueOf();
    },
    nextQuestion(state) {
      state.currentIndex += 1;
    },
    finish(state) {
      state.stage = "done";
    },
    resetSession(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  startInterview,
  initTimer,
  tick,
  pause,
  resume,
  nextQuestion,
  finish,
  resetSession,
} = interviewSlice.actions;

export default interviewSlice.reducer;
