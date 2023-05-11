import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import loginValidate from "./loginFormValidation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "../../../assets/css/responsive.css";
import { userRole } from "../../../constants/usersRoles";
import { loginUserActions } from "../../../features/user/surveyUserSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});
  const [validateData, setValidatedata] = useState(null);
  const [SubmitDisabled, setSubmitDisabled] = useState(null);

  const LoginData = useSelector((state) => state?.surveyUser?.data);
  const RegisterData = useSelector(
    (state) => state?.surveyUser?.signInUserReducer
  );
  const loginStatus = useSelector((state) => state?.surveyUser?.data);
  const notify = () => toast.error("Please enter Valid Data");
  const userData = JSON.parse(localStorage.getItem("loginDetails"));
  const userRoleID = userData?.role_id || "";
  const logOutStatus = useSelector(
    (state) => state?.surveyUser?.logOutUserReducer
  );

  if (userRoleID === userRole.ADMIN) {
    localStorage.setItem("UserRole", "admin");
    localStorage.setItem("token", userData?.accessToken);
    setTimeout(() => {
      navigate("/admin");
      // window.location.reload();
    }, 2000);
  } else if (userRoleID === userRole.SUPERVISOR) {
    // window.location.reload()
    localStorage.setItem("UserRole", "supervisor");
    localStorage.setItem("token", userData?.accessToken);
    localStorage.setItem("UUID", userData?.uuid);
    localStorage.setItem("WorkerData", JSON.stringify(userData?.worker_data));
    localStorage.setItem("UUID", userData?.uuid);
    localStorage.setItem("email", values.email);
    localStorage.setItem("WorkerData", JSON.stringify(userData?.worker_data));
    localStorage.setItem("img", userData?.profile);
    localStorage.setItem("name", userData?.name);
    localStorage.setItem("id", JSON.stringify(userData?.id));
    setTimeout(() => {
      navigate("/surveyPage/dashboard");
      // window.location.reload();
    }, 2000);
  } else if (userRoleID === userRole.WORKER) {
    localStorage.setItem("UserRole", "worker");

    // window.location.reload()
    localStorage.setItem("token", userData?.accessToken);
    localStorage.setItem("UUID", userData?.uuid);
    localStorage.setItem(
      "WorkerData",
      JSON.stringify([LoginData?.worker_data])
    );
    localStorage.setItem("UUID", userData?.uuid);
    localStorage.setItem("email", values.email);
    localStorage.setItem(
      "WorkerData",
      JSON.stringify([LoginData?.worker_data])
    );
    localStorage.setItem("img", LoginData?.profile);
    localStorage.setItem("name", LoginData?.name);

    setTimeout(() => {
      navigate("/surveyPage/survey");
      // window.location.reload();
    }, 2000);
  }
  useEffect(() => {
    if (RegisterData?.status === "success") {
      toast.success("your Data is Submited");
      setSubmitDisabled(true);
      setTimeout(() => {
        setSubmitDisabled(false);
      }, 1500);
    } else if (loginStatus?.statusCode === "200") {
      toast.success(loginStatus?.message);
      setSubmitDisabled(true);
      setTimeout(() => {
        setSubmitDisabled(false);
      }, 1500);
    } else if (LoginData?.status === "failed") {
      notify();
      setSubmitDisabled(true);
      setTimeout(() => {
        window.location.reload();
        setSubmitDisabled(false);
      }, 1500);
    } else if (logOutStatus?.statusCode === "200") {
      toast.success(logOutStatus?.message);
      window.scrollTo(0, 0);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [LoginData, loginStatus, logOutStatus, RegisterData?.status]);

  const handleChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    if (validateData) {
      setErrors(loginValidate(values));
    }
  };

  const Submit = (e) => {
    e.preventDefault();
    setErrors(loginValidate(values));
    setSubmitDisabled(true);
    setValidatedata(true);
    if (values.email !== "" && values.password !== "") {
      dispatch(loginUserActions(values));
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
          <h2 className="login">Login</h2>
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
            <label className="login-label-password">Password</label>
            <input
              type="password"
              className="login-input-password"
              value={values.password || ""}
              onChange={handleChange}
              name="password"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  Submit();
                }
              }}
              required
            />
            <a href="/resetpassword">ResetPassword</a>
            {errors.password && (
              <b className="login_is-danger">{errors.password}</b>
            )}
            <div className="link">
              <a className="login-reset-link" href="/addUser">
                {/* <i>  Reser password</i> */}
              </a>
            </div>
            <button
              className="login-btn"
              onClick={Submit}
              disabled={SubmitDisabled}
            >
              Login
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
export default Login;
