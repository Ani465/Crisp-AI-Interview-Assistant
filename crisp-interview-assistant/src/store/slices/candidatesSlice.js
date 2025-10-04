import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  list: [], // ordered by score on dashboard
};

const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    addCandidate: {
      prepare: (partial) => ({ payload: { id: uuid(), ...partial } }),
      reducer: (state, action) => {
        state.list.push({
          ...action.payload,
          interview: {
            questions: [],
            answers: [],
            perQuestionScores: [],
            finalScore: null,
            summary: "",
          },
          status: "created",
        });
      },
    },
    updateCandidate(state, action) {
      const { id, patch } = action.payload;
      const c = state.list.find((x) => x.id === id);
      if (c) Object.assign(c, patch);
    },
    upsertInterview(state, action) {
      const { id, patch } = action.payload;
      const c = state.list.find((x) => x.id === id);
      if (c) Object.assign(c.interview, patch);
    },
    recordAnswer(state, action) {
      const { id, index, answer, score } = action.payload;
      const c = state.list.find((x) => x.id === id);
      if (!c) return;
      c.interview.answers[index] = answer;
      if (typeof score === "number")
        c.interview.perQuestionScores[index] = score;
    },
    finalizeInterview(state, action) {
      const { id, finalScore, summary } = action.payload;
      const c = state.list.find((x) => x.id === id);
      if (!c) return;
      c.interview.finalScore = finalScore;
      c.interview.summary = summary;
      c.status = "completed";
    },
    sortByScore(state) {
      state.list.sort(
        (a, b) =>
          (b.interview.finalScore ?? -1) - (a.interview.finalScore ?? -1)
      );
    },
  },
});

export const {
  addCandidate,
  updateCandidate,
  upsertInterview,
  recordAnswer,
  finalizeInterview,
  sortByScore,
} = candidatesSlice.actions;

export default candidatesSlice.reducer;
