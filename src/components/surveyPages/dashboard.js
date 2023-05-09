import React from "react";
import "./dashboard.css";
import { deshboard } from "../common/data";
import { surveyUser } from "../../assets/img/Img";
import SurveyPages from "../../pages/surveyPages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserFooter from "../loginPageUser/footer/footer";
import { useNavigate } from "react-router-dom";
import {
  getAverageWorkerDataActions,
  getAverageWorkerDataMainActions,
} from "../../features/supervisor/surveySupervisorSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("loginDetails")) || [];
  const pendingData =
    useSelector(
      (state) => state?.supervisor?.getAverageWorkerData?.averageData
    ) || [];
  const mainData =
    useSelector(
      (state) => state?.supervisor?.getAverageWorkerDataMain?.averageData
    ) || [];
  const exists = Object.keys(userData).length;
  useEffect(() => {
    if (exists === 0) {
      navigate("/");
    }
  }, [exists, navigate]);

  useEffect(() => {
    dispatch(getAverageWorkerDataActions());
    dispatch(getAverageWorkerDataMainActions());
    window.scrollTo(0, 0);
  }, [dispatch]);

  let allSurvey =
    pendingData?.length === undefined
      ? deshboard.map((item) => item)
      : pendingData?.map((item, i) => Object.assign({}, item, mainData[i]));

  return (
    <div>
      <SurveyPages />
      <div className="dashboard-container">
        <p className="hello-xyz">
          Hello, <i>{localStorage.getItem("name")}</i>
        </p>
        <div className="dashboard-wrapper">
          <div className="wrapper-left">
            <p className="pending-survey">Pending survey approvals</p>
            <div>
              <div className="pending-scroll">
                <table id="panding-survey">
                  <thead>
                    <tr>
                      <th className="image"></th>
                      <th className="name">Name</th>
                      <th className="survey-points-th">Survey points</th>
                      <th className="approval-status">Approval status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mainData?.length === undefined ? (
                      <tr>No Data Found </tr>
                    ) : (
                      mainData !== undefined &&
                      mainData &&
                      mainData?.map((data, id) => {
                        return (
                          <React.Fragment key={id}>
                            <tr>
                              <td>
                                {" "}
                                {data.image_src == null ? (
                                  <img
                                    className="survey-dashbord-img"
                                    src={surveyUser}
                                    alt="alter"
                                  />
                                ) : (
                                  <img
                                    className="survey-dashbord-img"
                                    src={
                                      "data:image/png;base64," + data.image_src
                                    }
                                    alt="Hello"
                                  />
                                )}
                              </td>
                              <td>
                                {/* <div className="person-details"> */}

                                <b className="person">{data.name}</b>

                                <p className="designation">
                                  <i>Worker</i>
                                </p>
                                {/* </div> */}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {data.points === "N/A" ? (
                                  <p className="points">N/A</p>
                                ) : (
                                  <p className="points">
                                    {parseFloat(data.points).toFixed(1)}
                                  </p>
                                )}
                              </td>
                              <td>
                                {data.points === "N/A" ? (
                                  <span className="Pending">Pending</span>
                                ) : (
                                  <span className="submitted"> Submitted</span>
                                )}
                              </td>
                            </tr>
                          </React.Fragment>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="wrapper-right">
            <p className="pending-survey">Pending surveys from engineers</p>
            <div className="pending-scroll">
              <table id="panding-survey">
                <thead>
                  <tr>
                    <th className="image"></th>
                    <th className="name">Name</th>
                    <th className="survey-points-th">Survey points</th>
                    <th className="approval-status">Approval status</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingData?.length === undefined ? (
                    <tr>No Data Found </tr>
                  ) : pendingData ? (
                    pendingData !== undefined &&
                    pendingData &&
                    pendingData?.map((data, id) => {
                      return (
                        <React.Fragment key={id}>
                          <tr>
                            <td>
                              {data.image_src === null ? (
                                <img
                                  className="survey-dashbord-img"
                                  src={surveyUser}
                                  alt="alter"
                                />
                              ) : (
                                <img
                                  className="survey-dashbord-img"
                                  src={
                                    "data:image/png;base64," + data.image_src
                                  }
                                  alt="Hello"
                                />
                              )}
                            </td>
                            <td>
                              <b className="person">{data.name}</b>

                              <p className="designation">
                                <i>Worker</i>
                              </p>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {data.survey_points === "N/A" ? (
                                <p className="points">N/A</p>
                              ) : (
                                <p className="points">
                                  {parseFloat(data.survey_points).toFixed(1)}
                                </p>
                              )}
                            </td>
                            <td>
                              {data.survey_points === "N/A" ? (
                                <span className="Pending">Pending</span>
                              ) : (
                                <span className="submitted"> Submitted</span>
                              )}
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <div>No Data Found</div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="dashborder-team">
          <p className="team-statistics">Team statistics </p>
          <div className="team-form">
            <div className="team-scroll">
              <table id="team-survey">
                <thead>
                  <tr>
                    <th className="team-image"></th>
                    <th className="team-name">Name</th>
                    <th className="team-survey-points">Survey points</th>
                    <th className="team-approval-status">Supervisor points </th>
                  </tr>
                </thead>
                <tbody>
                  {allSurvey ? (
                    allSurvey !== undefined &&
                    allSurvey &&
                    allSurvey?.map((data, id) => {
                      return (
                        <React.Fragment key={id}>
                          <tr>
                            <td>
                              {data.image_src === null ? (
                                <img
                                  className="survey-dashbord-img"
                                  src={surveyUser}
                                  alt="alter"
                                />
                              ) : (
                                <img
                                  className="survey-dashbord-img"
                                  src={
                                    "data:image/png;base64," + data.image_src
                                  }
                                  alt="Hello"
                                />
                              )}
                            </td>
                            <td>
                              <b className="person">{data.name}</b>
                              <p className="designation">
                                <i>worker</i>
                              </p>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {data.points === "N/A" ? (
                                <p className="team-points">N/A</p>
                              ) : (
                                <p className="team-points">
                                  {" "}
                                  {parseFloat(data.points).toFixed(1)}
                                </p>
                              )}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {data.survey_points === "N/A" ? (
                                <p className="team-points">N/A</p>
                              ) : (
                                <p className="team-points">
                                  {" "}
                                  {parseFloat(data.survey_points).toFixed(1)}
                                </p>
                              )}
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <div>No data Found</div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <UserFooter />
    </div>
  );
};

export default Dashboard;
