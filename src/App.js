import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  passwordReset,
  Sign,
  Survey,
  worker,
  add,
  surveyPage,
  dashboard,
  team,
  setting,
  addTask,
  passwordReset_token,
} from "./components/common/constantRouter";
import AdminFlowPage from "./pages/adminFlow";
import LoginPage from "./pages/login";
import ResetPassword from "./pages/resetPassword";
import SurveyAppPage from "./pages/surveyApp";
import { Protected } from "./components/loginPageUser/login/protected";
import ErrorPage from "./components/common/404Page";
import WorkerDetails from "./components/Survey/workerDetails";
import RagisterPage from "./pages/ragisterPage"; // remove it

import AddTask from "./components/addTask";

import SurveyPages from "./pages/surveyPages";
import Dashboard from "./components/surveyPages/dashboard";
import Team from "./components/surveyPages/team";
import Setting from "./components/surveyPages/setting";
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from "./util/ProtectedRoute";
import ResetPasswordSet from "./pages/resetPassword_set";

function App() {
  return (
    <div className="main-edituser">
      <Routes>
        <Route path={Home} element={<Protected Component={LoginPage} />} />
        <Route path={passwordReset} element={<ResetPassword />} />
        <Route path={passwordReset_token} element={<ResetPasswordSet />} />
        <Route
          path={Sign}
          element={
            <ProtectedRoute>
              <AdminFlowPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={Survey}
          element={
            <ProtectedRoute>
              <SurveyAppPage />
            </ProtectedRoute>
          }
        />
        <Route path={add} element={<RagisterPage />} />
        <Route
          path={worker}
          element={
            <ProtectedRoute>
              <WorkerDetails />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
        <Route
          path={addTask}
          element={
            <ProtectedRoute>
              <AddTask />
            </ProtectedRoute>
          }
        />
        <Route
          path={surveyPage}
          element={
            <ProtectedRoute>
              <SurveyPages />
            </ProtectedRoute>
          }
        />
        <Route
          path={dashboard}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={team}
          element={
            <ProtectedRoute>
              <Team />
            </ProtectedRoute>
          }
        />
        <Route
          path={setting}
          element={
            <ProtectedRoute>
              <Setting />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
export default App;
