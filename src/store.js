import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import surveySupervisorSlice from "./features/supervisor/surveySupervisorSlice";
import surveySurveySlice from "./features/survey/surveySurveySlice";
import surveyUserSlice from "./features/user/surveyUserSlice";
import surveyWorkerSlice from "./features/worker/surveyWorkerSlice";

export const store = configureStore({
  reducer: {
    surveyUser: surveyUserSlice,
    survey: surveySurveySlice,
    worker: surveyWorkerSlice,
    supervisor: surveySupervisorSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
