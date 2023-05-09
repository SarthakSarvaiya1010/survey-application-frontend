import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../util/axios";

const initialState = {
  isLoading: false,
  error: false,
  fetchWorkerSurveyDataReducer: {},
  postWorkerSurveyDataReducer: {},
};

export const fetchWorkerSurveyDataActions = createAsyncThunk(
  "allSurvey/fetchWorkerSurveyDataActions",
  async (wuuid, thunkAPI) => {
    let token = localStorage.getItem("token");
    try {
      const res = await customFetch(`/survey/getWorkerData/${wuuid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (error) {
      return error;
    }
  }
);

export const postWorkerSurveyDataActions = createAsyncThunk(
  "allSurvey/postWorkerSurveyDataActions",
  async (details, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      const res = await customFetch.post("/survey/submissionWroker", details, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (error) {
      return error;
    }
  }
);

const surveyWorkerSlice = createSlice({
  name: "surveyWorker",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchWorkerSurveyDataActions.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchWorkerSurveyDataActions.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.fetchWorkerSurveyDataReducer = data;
    },
    [fetchWorkerSurveyDataActions.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.fetchWorkerSurveyDataReducer = data;
    },
    [postWorkerSurveyDataActions.pending]: (state) => {
      state.isLoading = true;
    },
    [postWorkerSurveyDataActions.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.postWorkerSurveyDataReducer = data;
    },
    [postWorkerSurveyDataActions.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.postWorkerSurveyDataReducer = data;
    },
  },
});

export default surveyWorkerSlice.reducer;
// eslint-disable-next-line no-empty-pattern
export const {} = surveyWorkerSlice.actions;
