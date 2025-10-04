import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    welcomeBackVisible: false,
    errors: [],
    searchQuery: "",
    sortKey: "score",
    sortOrder: "desc",
    activeTab: "interviewee", // 'interviewee' | 'interviewer'
    selectedCandidateId: null,
  },
  reducers: {
    setWelcomeBack(state, action) {
      state.welcomeBackVisible = action.payload;
    },
    pushError(state, action) {
      state.errors.push(action.payload);
    },
    clearErrors(state) {
      state.errors = [];
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSort(state, action) {
      Object.assign(state, action.payload);
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
    setSelectedCandidate(state, action) {
      state.selectedCandidateId = action.payload;
    },
  },
});

export const {
  setWelcomeBack,
  pushError,
  clearErrors,
  setSearchQuery,
  setSort,
  setActiveTab,
  setSelectedCandidate,
} = uiSlice.actions;

export default uiSlice.reducer;
