import React from "react";
import { logo } from "../../../assets/img/Img";
import "./adminHeader.css";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import LoaderComponent from "../../LoaderComponent";
import { useDispatch } from "react-redux";
import { logOutActions } from "../../../features/user/surveyUserSlice";

const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logOutActions());
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    // window.location.reload();
  };

  return (
    <>
      <div className="admin-header-main">
        <div className="head-container">
          <div className="admin-header-warpper">
            <img className="admin-header-img" src={logo} alt="Hello" />
            <h2 className="admin-title">Survey</h2>
            <LoaderComponent />
          </div>

          <div>
            <p
              className="admin-log-out"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              <IoIosLogOut className="log-out_logo" />
            </p>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Are you sure you want to Logout?
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                No
              </button>
              <button className="btn btn-primary" onClick={logOut}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminHeader;
