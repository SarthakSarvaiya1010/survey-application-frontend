import React from "react";
import Header from "../components/surveyHeader/surveyHeader";
import { NavLink } from "react-router-dom";
import "./surveyPages.css";
import {
  dashboard,
  team,
  setting,
  Survey,
  worker,
} from "../components/common/constantRouter";
// import UserFooter from "../components/loginPageUser/footer/footer";

const SurveyPages = () => {
  // let role = localStorage.getItem("UserRole");
  let workerid = JSON.parse(localStorage.getItem("workerid"));

  if (
    window.location.href.includes("/surveyPage/dashboard") ||
    window.location.href.includes("/surveyPage/Team") ||
    window.location.href.includes("/surveyPage/setting")
  ) {
    localStorage.setItem("workerid", false);
  }

  return (
    <div>
      <div>
        <Header />
      </div>
      {/* <nav id="nav" class="wrap">
    <input type="checkbox" name="toggle" id="toggle" />
    <label for="toggle"><i class="icon-reorder"></i>Menu</label>
    <ul id="menu">
      <li><NavLink to={dashboard} >Home  </NavLink></li>
      <li className="link4"><NavLink to={Survey} className="link5">Portfolio </NavLink></li>
      <li><NavLink to={team}>Services</NavLink></li>
      <li><NavLink to={setting}>Blog</NavLink></li>
    </ul>
  </nav> */}
      <div className="Survey-pages">
        <li className="link-dashboard">
          <NavLink to={dashboard} className="link-dashboard-a">
            <b>Dashboard</b>
          </NavLink>
        </li>
        {workerid === false ? (
          <li className="link-survey">
            <NavLink to={Survey} className="link-survey-a">
              <b>Survey</b>
            </NavLink>
          </li>
        ) : (
          <li className="link-survey">
            <NavLink to={worker} className="link-survey-a">
              <b>Survey</b>
            </NavLink>
          </li>
        )}

        <li className="link-team">
          <NavLink to={team} className="link-team-a">
            <b>Team</b>
          </NavLink>
        </li>
        <li className="link-setting">
          <NavLink to={setting} className="link-setting-a">
            <b>Settings</b>
          </NavLink>
        </li>
      </div>
    </div>
  );
};

export default SurveyPages;
