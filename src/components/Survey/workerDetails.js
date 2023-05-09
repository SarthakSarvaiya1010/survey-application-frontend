/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import WorkerSurvey from "./WorkerSurvey";
import WorkerFooter from "../surveyFooter/workerFooter";
import "./surveyApp.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { fetchUserAction } from "../../redux/action/userDataAction/fetchUser";
import SurveyPages from "../../pages/surveyPages";
import {
  fetchWorkerSurveyDataActions,
  postWorkerSurveyDataActions,
} from "../../features/worker/surveyWorkerSlice";
import { SurveyData } from "../common/data";
import { fetchUserActions } from "../../features/user/surveyUserSlice";

const WorkerDetails = () => {
  const uuid = localStorage.getItem("UUID");
  const wtabID = JSON.parse(localStorage.getItem("wtabId")) || 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let LoginData = JSON.parse(localStorage.getItem("WorkerData") || "[]");
  const [tabActive, setTabActive] = useState(wtabID || 0);
  const data = useSelector(
    (state) => state?.worker?.fetchWorkerSurveyDataReducer
  );

  const optionData = useSelector((state) => state?.fetchUserReducer?.data);
  let superVisor = optionData && optionData?.find((e) => e.uuid === uuid);
  // let workerName = workerMap.find((e) => e.id == worker);
  let UUID = localStorage.getItem("UUID");
  const wuuid = localStorage.getItem("workerId");
  const [test, setTest] = useState(wuuid);

  const userData =
    useSelector((state) => state?.surveyUser?.fetchUserReducer) || [];

  let reporting_person_id = JSON.parse(localStorage.getItem("id"));

  let supervisorData =
    userData?.length > 0 &&
    userData
      ?.filter(function (supervisor) {
        return supervisor.reporting_person_id === reporting_person_id;
      })
      .map(function (supervisor) {
        return supervisor;
      });

  useEffect(() => {
    dispatch(fetchWorkerSurveyDataActions(test, UUID));
    dispatch(fetchUserActions());
  }, [UUID, dispatch, test]);

  var splitURL = window.location.pathname.toString().split("/");

  let defaultWorker = splitURL[2];

  if (data?.surveydata) {
    SurveyData?.surveyData?.surveydata?.map((sdata) =>
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
      })
    );
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
    localStorage.setItem("wtabId", tabId + 1);
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
      postWorkerSurveyDataActions({
        user_id: reporting_person_id,
        wuuid,
        surveydata,
      })
    );
    dispatch(fetchWorkerSurveyDataActions(test, UUID));
  };
  const superVisor1 = localStorage.getItem("supervisor");

  const handleChange = (e) => {
    dispatch(fetchUserActions());
    let workerData = e.target.value;
    localStorage.setItem("workerId", workerData);
    localStorage.setItem("workerid", true);
    setTest(workerData);
    navigate(`/Survey/${workerData}`);
  };
  let dm;
  if (superVisor?.role_id === 2) {
    dm = LoginData?.map((e) => e.id == null);
  }
  let role = localStorage.getItem("UserRole");

  let testS =
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
      {role === "supervisor" ? <SurveyPages /> : ""}
      <div className="container">
        <div className="date-container">
          <div className="date">
            <h2>
              {monthName} {new Date().getFullYear()}
            </h2>
          </div>
          {!superVisor1 && supervisorData && (
            <select
              className="select-option"
              onChange={handleChange}
              name="reporting_person_id"
              disabled={dm === "false"}
              value={defaultWorker}
            >
              <option value="" disabled selected hidden>
                Select Worker
              </option>
              {supervisorData?.map((data, id) => {
                return (
                  <React.Fragment key={id}>
                    <option value={data.uuid} key={id}>
                      {data.name}
                    </option>
                  </React.Fragment>
                );
              })}
            </select>
          )}
        </div>

        {SurveyData?.surveyData?.surveydata?.map((surveyData, id) => {
          return (
            <div key={id} className="survey-wrapper">
              <WorkerSurvey
                tabId={id}
                title={surveyData.title}
                questions={surveyData.question}
                setTab={(id) => setTab(id)}
                isActive={tabActive === id}
                setAnswers={(surveyInfo) => setServeyAnswers(surveyInfo)}
                submitSurvey={() => submitSurvey()}
                comments={surveyData.comment}
                test1={test1}
                test2={test2}
                test3={test3}
                testS={testS}
              />
            </div>
          );
        })}
      </div>

      <WorkerFooter data={data?.surveyData?.surveydata} isActive={tabActive} />
    </div>
  );
};
export default WorkerDetails;
