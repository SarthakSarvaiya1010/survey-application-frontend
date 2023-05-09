import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import passwordValidate from "./passwordFormValidation";
import "../loginPageUser/login/login.css";
import "./reset.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { forgetPasswordActions } from "../../features/user/surveyUserSlice";
// import "../../assets/css/responsive.css";

const ResetPw = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});
  const [validateData, setValidatedata] = useState(null);
  const forgetPasswordStatus = useSelector(
    (state) => state?.surveyUser?.forgetpassword
  );
  const forgetPasswordStatusSuccess = useSelector(
    (state) => state?.surveyUser?.forgetpassword
  );
  const [enable, setEnable] = useState(null);

  useEffect(() => {
    if (forgetPasswordStatusSuccess?.statusCode === "200") {
      toast.success(forgetPasswordStatusSuccess?.message);
      setTimeout(() => {
        navigate("/");
        window.location.reload();
        localStorage.clear();
      }, 1500);
    } else if (forgetPasswordStatus?.status === "failed") {
      toast.error(forgetPasswordStatus?.message);
    }
  }, [
    forgetPasswordStatus?.message,
    forgetPasswordStatus?.status,
    forgetPasswordStatusSuccess?.message,
    forgetPasswordStatusSuccess?.statusCode,
    navigate,
  ]);

  const handleChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    if (validateData) {
      setEnable(false);
      setErrors(passwordValidate(values));
    }
  };
  const Submit = (e) => {
    setEnable(true);
    setValidatedata(true);
    setErrors(passwordValidate(values, setValues));
    const data = {
      email: values.email,
    };
    if (values.email !== undefined) {
      dispatch(forgetPasswordActions(data));
    }
  };
  return (
    <div>
      <ToastContainer
        className="ToastContainer"
        position="top-right"
        autoClose={1500}
        limit={1}
      />
      <div className="login-form-container">
        <div className="login-wrapper">
          <h2 className="reset">Reset Password</h2>
          <div className="login-form-group">
            <label className="login-label">Email</label>
            <input
              type="email"
              className="login-input-field login-input"
              value={values.email || " "}
              onChange={handleChange}
              name="email"
              required
            />
            {errors.email && (
              <b className="login_is-danger for-email">{errors.email}</b>
            )}
            <button className="login-btn" onClick={Submit} disabled={enable}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="img-container">
        <div className="img-container1"></div>
      </div>
    </div>
  );
};
export default ResetPw;
