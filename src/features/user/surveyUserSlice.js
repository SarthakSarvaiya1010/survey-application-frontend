import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../util/axios";

const initialState = {
  isLoading: false,
  loginUserReducer: {},
  signInUserReducer: {},
  fetchUserReducer: {},
  toggle: false,
  data: [],
  error: false,
  logOutUserReducer: {},
  putUserEditDataR: {},
  deleteUserById: {},
  editDataR: {},
  deleteData: {},
  forgetpassword: {},
  resetpassword: {},
  expired: {},
};

export const fetchUserActions = createAsyncThunk(
  "allSurvey/getUser",
  async (_, thunkAPI) => {
    let token = localStorage.getItem("token");
    try {
      const res = await customFetch(`/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return err.response.data;
    }
  }
);

export const loginUserActions = createAsyncThunk(
  "allSurvey/loginUser",
  async (details, thunkAPI) => {
    try {
      const res = await customFetch.post("/login", details);
      localStorage.setItem("token", res.data.accessToken);
      return res;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const signInUserActions = createAsyncThunk(
  "allSurvey/signInUserActions",
  async (details, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      const res = await customFetch.post(`/register`, details, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return err.response.data;
    }
  }
);

export const getEditDataAction = createAsyncThunk(
  "allSurvey/getEditDataAction",
  async (details) => {
    return details;
  }
);

export const editUserActions = createAsyncThunk(
  "allSurvey/editUserAction",
  async (data, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      let id = localStorage.getItem("editId");
      const res = await customFetch.put(`/edit/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return err.response.data;
    }
  }
);

export const getDeleteDataAction = createAsyncThunk(
  "allSurvey/getDeleteDataAction",
  async (details) => {
    return details;
  }
);

export const deleteUserActions = createAsyncThunk(
  "allSurvey/deleteUserActions",
  async (id, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      const res = await customFetch.delete(`/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return err.response.data;
    }
  }
);

export const logOutActions = createAsyncThunk(
  "allSurvey/logOutActions",
  async (_, thunkAPI) => {
    let token = localStorage.getItem("token");
    try {
      const res = await customFetch(`/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return err.response.data;
    }
  }
);

export const forgetPasswordActions = createAsyncThunk(
  "allSurvey/forgetPasswordActions",
  async (details, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      const res = await customFetch.post(`/forgetpassword`, details, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return err.response.data;
    }
  }
);

export const resetPasswordActions = createAsyncThunk(
  "allSurvey/resetPasswordActions",
  async (details, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      let resettoken = JSON.parse(localStorage.getItem("resettoken"));
      const res = await customFetch.post(
        `/resetpassword/${resettoken}`,
        details,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return err.response.data;
    }
  }
);

export const expiredPasswordActions = createAsyncThunk(
  "allSurvey/expiredPasswordActions",
  async (details, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      let resettoken = JSON.parse(localStorage.getItem("resettoken"));
      const res = await customFetch.get(
        `/checklinkexpired/${resettoken}`,
        details,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res;
    } catch (error) {
      return error.response;
    }
  }
);

const surveyUserSlice = createSlice({
  name: "surveyUser",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [loginUserActions.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUserActions.fulfilled]: (state, payload) => {
      state.isLoading = false;

      const {
        payload: { status },
      } = payload;
      if (status === "failed") {
        state.data = payload.payload;
      } else {
        const {
          payload: { data },
        } = payload;
        state.data = data;
        localStorage.setItem("loginDetails", JSON.stringify(data));
      }
    },
    [loginUserActions.rejected]: (state, payload) => {
      state.isLoading = false;
      state.data = payload;
    },
    [fetchUserActions.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUserActions.fulfilled]: (state, payload) => {
      state.toggle = true;
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.fetchUserReducer = data;
      // return { ...state, fetchUserReducer: { ...state.fetchUserReducer, data } }
    },
    [signInUserActions.pending]: (state) => {
      state.isLoading = true;
    },
    [signInUserActions.fulfilled]: (state, payload) => {
      console.log("pay", payload);
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;

      state.signInUserReducer = data;
    },
    [signInUserActions.rejected]: (state, payload) => {
      state.isLoading = false;

      state.signInUserReducer = payload.payload;
    },
    [getEditDataAction.pending]: (state) => {
      state.isLoading = true;
    },
    [getEditDataAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      state.editDataR = payload.payload;
    },
    [editUserActions.pending]: (state) => {
      state.isLoading = true;
    },
    [editUserActions.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.putUserEditDataR = data;
    },
    [editUserActions.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.putUserEditDataR = data;
    },
    [getDeleteDataAction.pending]: (state) => {
      state.isLoading = true;
    },
    [getDeleteDataAction.fulfilled]: (state, payload) => {
      state.isLoading = false;
      state.deleteData = payload.payload;
    },
    [deleteUserActions.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUserActions.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.deleteUserById = data;
    },
    [deleteUserActions.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.deleteUserById = data;
    },
    [logOutActions.fulfilled]: (state, payload) => {
      const {
        payload: { data },
      } = payload;
      state.logOutUserReducer = data;
    },
    [logOutActions.rejected]: (state, payload) => {
      const {
        payload: { data },
      } = payload;
      state.logOutUserReducer = data;
    },
    [forgetPasswordActions.pending]: (state) => {
      state.isLoading = true;
    },
    [forgetPasswordActions.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.forgetpassword = data;
    },
    [forgetPasswordActions.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.forgetpassword = data;
    },
    [resetPasswordActions.pending]: (state) => {
      state.isLoading = true;
    },
    [resetPasswordActions.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.resetpassword = data;
    },
    [resetPasswordActions.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.resetpassword = data;
    },
    [expiredPasswordActions.pending]: (state) => {
      state.isLoading = true;
    },
    [expiredPasswordActions.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      console.log("payload", data);
      state.expired = data;
    },
    [expiredPasswordActions.rejected]: (state, payload) => {
      state.isLoading = false;
      const {
        payload: { data },
      } = payload;
      state.expired = data;
    },
  },
});

export default surveyUserSlice.reducer;
// eslint-disable-next-line no-empty-pattern
export const {} = surveyUserSlice.actions;
