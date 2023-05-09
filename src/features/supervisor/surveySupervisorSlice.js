import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../util/axios";
const initialState = {
  isLoading: false,
  error: false,
  getAverageWorkerData: {},
  getAverageWorkerDataMain: {},
};

export const getAverageWorkerDataActions = createAsyncThunk(
  "allSurvey/getAverageWorkerDataDataActions",
  async (wuuid, thunkAPI) => {
    let reporting_person_id = localStorage.getItem("id");
    let token = localStorage.getItem("token");
    try {
      const res = await customFetch(
        `/survey/getworkerSurveyAverage?reporting_person_id=${reporting_person_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res;
    } catch (error) {
      return error;
    }
  }
);

export const getAverageWorkerDataMainActions = createAsyncThunk(
  "allSurvey/getAverageWorkerDataMainActions",
  async (wuuid, thunkAPI) => {
    let reporting_person_id = localStorage.getItem("id");
    let token = localStorage.getItem("token");
    try {
      const res = await customFetch(
        `/survey/getworkerSurveyAverageFromMain?reporting_person_id=${reporting_person_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res;
    } catch (error) {
      return error;
    }
  }
);

const surveySupervisorSlice = createSlice({
  name: "surveySupervisor",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getAverageWorkerDataActions.pending]: (state) => {
      state.isLoading = true;
    },
    [getAverageWorkerDataActions.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.getAverageWorkerData = data;
    },
    [getAverageWorkerDataActions.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.getAverageWorkerData = data;
    },
    [getAverageWorkerDataMainActions.pending]: (state) => {
      state.isLoading = true;
    },
    [getAverageWorkerDataMainActions.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.getAverageWorkerDataMain = data;
    },
    [getAverageWorkerDataMainActions.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.getAverageWorkerDataMain = data;
    },
  },
});

export default surveySupervisorSlice.reducer;
// eslint-disable-next-line no-empty-pattern
export const {} = surveySupervisorSlice.actions;
