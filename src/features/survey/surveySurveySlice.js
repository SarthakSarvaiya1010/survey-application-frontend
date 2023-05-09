import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../util/axios";

const initialState = {
  isLoading: false,
  error: false,
  fetchSurveyDataReducer: {},
  postSurveyDataReducer: {},
};

export const fetchSurveyDataActions = createAsyncThunk(
  "allSurvey/fetchSurveyDataActions",
  async (_, thunkAPI) => {
    let UUID = localStorage.getItem("UUID");
    let token = localStorage.getItem("token");
    try {
      const res = await customFetch(`/survey/data/${UUID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (error) {
      return error;
    }
  }
);

export const postSurveyDataActions = createAsyncThunk(
  "allSurvey/postSurveyDataActions",
  async (details, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      const res = await customFetch.post("/survey/submission/", details, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (error) {
      return error;
    }
  }
);

const surveySurveySlice = createSlice({
  name: "survey",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchSurveyDataActions.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchSurveyDataActions.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.fetchSurveyDataReducer = data;
    },
    [fetchSurveyDataActions.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.fetchSurveyDataReducer = data;
    },
    [postSurveyDataActions.pending]: (state) => {
      state.isLoading = true;
    },
    [postSurveyDataActions.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.postSurveyDataReducer = data;
    },
    [postSurveyDataActions.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.postSurveyDataReducer = data;
    },
  },
});

export default surveySurveySlice.reducer;
// eslint-disable-next-line no-empty-pattern
export const {} = surveySurveySlice.actions;
