import React, { useEffect, useState } from "react";
import SurveyPages from "../../pages/surveyPages";
import { user } from "../../assets/img/Img";
import EscapeOutside from "react-escape-outside";
import { useDispatch, useSelector } from "react-redux";
import { userDataStatic } from "../../components/common/data";
import { FiEye } from "react-icons/fi";
import "../surveyPages/team.css";
import TeamUser from "./teamModal/teamUser";
import UserFooter from "../loginPageUser/footer/footer";
import {
  fetchUserActions,
  getEditDataAction,
} from "../../features/user/surveyUserSlice";

const Team = () => {
  const [showEdit, setShowEdit] = useState(false);
  const dispatch = useDispatch();

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

  const Edit = (data) => {
    window.scroll(0, 0);
    setShowEdit(true);
    dispatch(getEditDataAction(data));
  };

  useEffect(() => {
    dispatch(fetchUserActions());
  }, [dispatch]);

  return (
    <div>
      <SurveyPages />
      <div className="container">
        <div className="teamFlow">
          <EscapeOutside onEscapeOutside={() => setShowEdit(false)}>
            <div>{showEdit && <TeamUser setShowEdit={setShowEdit} />}</div>
          </EscapeOutside>

          <div className="supervisor-map">
            {supervisorData !== undefined &&
              supervisorData &&
              supervisorData?.map((e, id) => {
                return (
                  <div className="supervisor" key={id}>
                    <div className="supervisor-profile">
                      {e.image_src == null ? (
                        <div className="supervisor-img-null">
                          <img src={user} alt="alter" />
                        </div>
                      ) : (
                        <div className="supervisor-img">
                          <img
                            src={"data:image/png;base64," + e.image_src}
                            alt="Hello"
                          />
                        </div>
                      )}
                    </div>
                    <p className="supervisor-details">{e.name}</p>
                    <div className="supervisor-report">
                      <div className="supervisor_user_name_Id">
                        {e.reporting_person_name == null ? (
                          <b className="supervisor_reporting_person_name">
                            {e.role}
                          </b>
                        ) : (
                          <div>
                            <p className="supervisor_reporting_to">
                              reporting to
                            </p>
                            <p className="supervisor_reporting_person_name">
                              {e.reporting_person_name}
                            </p>
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="edit-icon" onClick={() => Edit(e)}>
                          <FiEye />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            {supervisorData === undefined &&
              userDataStatic &&
              userDataStatic?.map((e, id) => {
                return (
                  <div className="user" key={id}>
                    <div className="supervisor-profile">
                      {e.image_src == null ? (
                        <div className="supervisor-img-null">
                          <img src={user} alt="alter" />
                        </div>
                      ) : (
                        <div className="supervisor-img">
                          <img
                            src={"data:image/png;base64," + e.image_src}
                            alt="Hello"
                          />
                        </div>
                      )}
                    </div>
                    <p className="user-details">{e.name}</p>
                    <div className="user-report">
                      <div>
                        <div className="user_name_Id">
                          {e.reporting_person_name == null ? (
                            <b className="reporting_person_name">{e.role}</b>
                          ) : (
                            <div>
                              <p className="reporting_to">reporting to</p>
                              <br />
                              <p className="reporting_person_name">
                                {e.reporting_person_name}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="edit-icon" onClick={() => Edit(e)}>
                          <FiEye />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <UserFooter />
    </div>
  );
};

export default Team;
