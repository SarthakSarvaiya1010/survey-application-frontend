/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "../loginPageUser/login/login.css";
import passwordValidate from "./passwordFormValidation";
import { useNavigate } from "react-router-dom";
// import "../../assets/css/responsive.css";
import "./reset.css";
import {
  expiredPasswordActions,
  resetPasswordActions,
} from "../../features/user/surveyUserSlice";

const ResetPasswordToken = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});
  const [validateData, setValidatedata] = useState(null);
  const [isExpired, setIsExpired] = useState(false);

  const params = window.location.pathname;
  const resetPasswordStatus = useSelector(
    (state) => state?.surveyUser?.resetpassword
  );
  const expiredLink = useSelector((state) => state?.surveyUser?.expired);
  const valueparams = params.split("/")[2];
  localStorage.setItem("resettoken", JSON.stringify(valueparams));

  console.log(expiredLink?.status === "failed");
  useEffect(() => {
    dispatch(expiredPasswordActions());
  }, [dispatch]);

  useEffect(() => {
    if (expiredLink?.status === "failed") {
      setIsExpired(true);
    }
  }, [expiredLink, isExpired]);

  useEffect(() => {
    if (resetPasswordStatus?.statusCode === "200") {
      toast.success(resetPasswordStatus?.message);
      setTimeout(() => {
        navigate("/");
        window.location.reload();
        localStorage.clear();
      }, 1500);
    } else if (resetPasswordStatus?.status === "failed") {
      toast.error(resetPasswordStatus?.message);
    }
  }, [
    navigate,
    resetPasswordStatus?.message,
    resetPasswordStatus?.status,
    resetPasswordStatus?.statusCode,
  ]);

  const handleChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    if (validateData) {
      setErrors(passwordValidate(values));
    }
  };
  const data = {
    password: values.password,
    confirmPassword: values.confirmPassword,
  };

  const Submit = () => {
    setValidatedata(true);
    setErrors(passwordValidate(values));
    if (values.password !== undefined && values.confirmPassword !== undefined) {
      dispatch(resetPasswordActions(data));
    }
  };

  const ResendLink = () => {
    navigate("/resetpassword");
  };

  console.log("isExpired", isExpired);
  return (
    <div>
      <ToastContainer
        className="ToastContainer"
        position="top-right"
        autoClose={1500}
        limit={1}
      />
      {isExpired ? (
        <div className="login-form-container">
          <div className="login-wrapper">
            <h2 className="reset">Reset Password Link Expired</h2>
            <div>
              <div className="img-container">
                <div className="img-session"></div>
              </div>
              <h6>
                Hi, there your magic reset password link has expired, because
                you haven't used it. Reset Password link expires in every 10
                minutes and can only be used once. You can create one by
                clicking on Request button too.
              </h6>
              <button className="linkEx-btn" onClick={ResendLink}>
                Forget Password
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="login-form-container">
          <div className="login-wrapper">
            <h2 className="reset">Reset Password</h2>
            <div className="login-form-group">
              <label className="login-label">Password</label>
              <input
                type="password"
                className="login-input-password"
                value={values.password || ""}
                onChange={handleChange}
                name="password"
              />
              {errors.password && (
                <b className="login_is-danger">{errors.password}</b>
              )}
              <label className="reset-password-label">Confirm Password</label>
              <input
                type="password"
                className="login-input-password"
                value={values.confirmPassword || ""}
                onChange={handleChange}
                name="confirmPassword"
              />
              {errors.confirmPassword && (
                <b className="login_is-danger">{errors.confirmPassword}</b>
              )}
              <div className="link">
                <a className="login-reset-link" href="/addUser"></a>
              </div>
              <button className="login-btn" onClick={Submit}>
                Reset Password
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="img-container">
        <div className="img-container1"></div>
      </div>
    </div>
  );
};
export default ResetPasswordToken;
