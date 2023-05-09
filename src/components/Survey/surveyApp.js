/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import Survey from "./survey";
import Footer from "../surveyFooter/surveyFooter";
import Header from "../surveyHeader/surveyHeader";
import "./surveyApp.css";
import "../../assets/css/responsive.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SurveyData } from "../common/data";
import SurveyPages from "../../pages/surveyPages";
import {
  fetchSurveyDataActions,
  postSurveyDataActions,
} from "../../features/survey/surveySurveySlice";
import { fetchUserActions } from "../../features/user/surveyUserSlice";

const SurveyApp = () => {
  const tabID = JSON.parse(localStorage.getItem("tabId"));
  const uuid = localStorage.getItem("UUID");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tabActive, setTabActive] = useState(tabID || 0);
  const is_SupervisorData = false;
  const data = useSelector((state) => state?.survey?.fetchSurveyDataReducer);

  const userData =
    useSelector((state) => state?.surveyUser?.fetchUserReducer) || [];

  let reporting_person_id = JSON.parse(localStorage.getItem("id"));

  let supervisorDataDrop =
    userData?.length > 0 &&
    userData
      ?.filter(function (supervisor) {
        return supervisor.reporting_person_id === reporting_person_id;
      })
      .map(function (supervisor) {
        return supervisor;
      });

  let LoginData = JSON.parse(localStorage.getItem("WorkerData") || "[]");
  const optionData =
    useSelector((state) => state?.surveyUser?.fetchUserReducer) || "[]";
  let superVisor =
    optionData?.length > 0 &&
    optionData &&
    optionData?.find((e) => e.uuid === uuid);

  useEffect(() => {
    dispatch(fetchSurveyDataActions());
    dispatch(fetchUserActions());
  }, [dispatch]);

  if (data?.surveydata) {
    SurveyData?.surveyData?.surveydata?.map((sdata) => {
      data?.surveydata?.map((Apidata) => {
        if (Apidata.survey_id === sdata.survey_id) {
          sdata.comment = Apidata.comment;
          sdata.question.map((sQ) => {
            Apidata.question.map((ApiQ) => {
              if (ApiQ.qid === sQ.qid) {
                sQ.ans = ApiQ.ans;
              }
            });
          });
        }
      });
    });
  }
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var d = new Date();
  var monthName = months[d.getMonth()];
  const setTab = (tabId) => {
    setTabActive(tabId + 1);
    localStorage.setItem("tabId", tabId + 1);
  };
  let surveydata;

  const setServeyAnswers = (surveyInfo) => {
    let mySurveyIndex = SurveyData?.surveyData?.surveydata.findIndex(
      (survey) => survey.survey_id === surveyInfo.survey_id
    );

    let survey = SurveyData?.surveyData?.surveydata[mySurveyIndex];

    survey.comment = surveyInfo.comment;
    surveyInfo.question.map((question) => {
      let questionIndex = survey.question.findIndex(
        (sQuestion) => sQuestion.qid === question.qid
      );
      survey.question[questionIndex].ans = question.ans;
    });
    surveydata = SurveyData?.surveyData?.surveydata;
  };

  const submitSurvey = () => {
    dispatch(
      postSurveyDataActions({
        uuid,
        surveydata,
      })
    );
    // dispatch(fetchSurveyDataActions());
  };
  const handleChange = (e) => {
    dispatch(fetchUserActions(e));
    let workerData = e.target.value;
    localStorage.setItem("workerId", workerData);
    localStorage.setItem("SupervisorData", is_SupervisorData);
    localStorage.setItem("workerid", true);
    navigate(`/Survey/${workerData}`);
    window.location.reload();
  };
  let dm;
  if (superVisor?.role_id === 2) {
    dm = LoginData.map((e) => e?.id == null);
  }

  let role = localStorage.getItem("UserRole");

  let test =
    SurveyData?.surveyData?.surveydata[2].question[4].qid === 15 &&
    SurveyData?.surveyData?.surveydata[2]?.question[4]?.ans !== ""
      ? true
      : false;

  let test1 =
    SurveyData?.surveyData?.surveydata[0].question[4].qid === 5 &&
    SurveyData?.surveyData?.surveydata[0]?.question[4]?.ans !== ""
      ? true
      : false;
  let test2 =
    SurveyData?.surveyData?.surveydata[1].question[4].qid === 10 &&
    SurveyData?.surveyData?.surveydata[1]?.question[4]?.ans !== ""
      ? true
      : false;
  let test3 =
    SurveyData?.surveyData?.surveydata[2].question[4].qid === 15 &&
    SurveyData?.surveyData?.surveydata[2]?.question[4]?.ans !== ""
      ? true
      : false;

  return (
    <div className="wrepper">
      <div>
        {role === "supervisor" ? "" : <Header />}
        {role === "supervisor" ? <SurveyPages /> : ""}
        <div className="container" style={{ paddingTop: "40px" }}>
          <div className="date-container">
            <div className="date">
              <h2>
                {monthName} {new Date().getFullYear()}
              </h2>
            </div>
            {role === "supervisor" && supervisorDataDrop && (
              <select
                className="select-option"
                onChange={handleChange}
                name="reporting_person_id"
                disabled={dm[0] === true}
              >
                <option value="" disabled selected hidden>
                  Select Worker
                </option>
                {supervisorDataDrop?.map((data, id) => {
                  return (
                    <React.Fragment key={id}>
                      return (
                      <option value={data.uuid} key={id}>
                        {data.name}
                      </option>
                      );
                    </React.Fragment>
                  );
                })}
              </select>
            )}
          </div>

          {SurveyData?.surveyData?.surveydata?.map((surveyData, id) => {
            let answerlength = surveyData.question[0].ans;

            return (
              <div key={id} className="survey-wrapper">
                <Survey
                  tabId={id}
                  title={surveyData.title}
                  questions={surveyData.question}
                  test={test}
                  setTab={(id) => setTab(id)}
                  isActive={tabActive === id}
                  setAnswers={(surveyInfo) => setServeyAnswers(surveyInfo)}
                  submitSurvey={() => submitSurvey()}
                  comments={surveyData.comment}
                  answerlength={answerlength}
                  test1={test1}
                  test2={test2}
                  test3={test3}
                  tabActive={tabActive}
                />
              </div>
            );
          })}
        </div>
      </div>

      <Footer
        data={SurveyData?.surveyData?.surveydata}
        isActive={tabActive}
        test1={test1}
        test2={test2}
        test3={test3}
      />
    </div>
  );
};
export default SurveyApp;
