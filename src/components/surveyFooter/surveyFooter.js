import React from "react";
import "./surveyFooter.css";
import "../../assets/css/global.css";

import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Footer = (props) => {
  const navigate = useNavigate();

  let surveydata = props.data;
  let isActive = props.isActive;

  let btnValidation = false;

  let role = localStorage.getItem("UserRole");
  let btn = surveydata?.map((e) => e.comment);
  btn?.map((item) => (!item.length > 0 ? (btnValidation = true) : " "));

  const Submit = () => {
    if (role === "supervisor") {
      navigate("/surveyPage/dashboard");
      window.location.reload();
    } else {
      navigate("/");
      window.location.reload();
      localStorage.clear();
    }
  };

  useEffect(() => {
    if (isActive === 3) {
      toast.success("Review submitted succeccfully!");
    }
  }, [isActive]);

  isActive === 3 ? (btnValidation = false) : (btnValidation = true);

  return (
    <>
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-btn-wrapper">
            <button
              className="footer-btn"
              disabled={btnValidation}
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Finish
            </button>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Are you sure you want to submit data?
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
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={Submit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
