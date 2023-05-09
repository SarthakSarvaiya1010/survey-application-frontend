import React, { useState, useEffect } from "react";
import useForm from "./useForm";
import Validate from "./LoginFormValidationRules";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserAction } from "../../../redux/action/userDataAction/fetchUser";

function USer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const [reviews, setReviews] = useState(false);
  const [img, setImg] = useState();
  const data = useSelector((state) => state?.fetchUserReducer?.data);
  useEffect(() => {
    dispatch(fetchUserAction());
  }, [dispatch]);
  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    setImg(file);
    if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
      setReviews("select valid image type.");
      return false;
    }
    if (file.size > 307200) {
      setReviews("select valid size of image.");
      return false;
    }
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
        setReviews(false);
      };
      reader.readAsDataURL(file);
    }
  };
  const reviewsHandler = () => {
    if (!img) {
      setReviews(true);
      setReviews("Please select image.");
      return false;
    }
  };
  const { values, errors, handleChange, handleSubmit } = useForm(Validate, img);
  return (
    <div className="main_container ">
      <h4 className="form_container">Registration</h4>
      <hr />
      <div className="form-wrapper">
        <form id="contact-form" method="post" className="form-group">
          <div className="first_last_name">
            <div className="first_name">
              <label className="form-label">First Name</label>
              <br />
              <input
                autoComplete="off"
                className="form-input-field-name"
                type="text"
                name="name"
                onChange={handleChange}
                value={values.name || ""}
                required
              />
              <br />
              {errors.name && <b className="is-danger_name">{errors.name}</b>}
            </div>
            <div className="first_name">
              <label className="form-label">Last Name</label>
              <br />
              <input
                autoComplete="off"
                className="form-input-field-name"
                type="text"
                name="last_name"
                onChange={handleChange}
                value={values.last_name || ""}
                required
              />
              <br />
              {errors.last_name && (
                <b className="is-danger_name">{errors.last_name}</b>
              )}
            </div>
          </div>
          <label className="form-label">Email Address</label>
          <br />
          <input
            autoComplete="off"
            className="form-input-field"
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email || ""}
            required
          />
          <br />
          {errors.email && <b className="is-danger">{errors.email}</b>}

          <label className="phone">Phone Number</label>
          <br />
          <input
            autoComplete="off"
            className="form-input-field"
            type="text"
            name="phone"
            onChange={handleChange}
            value={values.phone || ""}
            required
          />
          <br />

          {errors.phone && <b className="is-danger">{errors.phone}</b>}

          <label className="phone">Designation</label>
          <br />
          <div>
            <select
              className="select"
              onChange={handleChange}
              value={values.role_id || ""}
              name="role_id"
            >
              <option>Select from Designation</option>
              <option value={3}>Worker</option>
              <option value={2}> Supervisor</option>
            </select>
            <br />
            {errors.role_id && <b className="is-danger">{errors.role_id}</b>}
          </div>

          <label className="Reporting">Reporting to</label>
          <br />
          <div>
            <select
              className="select"
              onChange={handleChange}
              value={values.reporting_person_id || ""}
              name="reporting_person_id"
              disabled={values.role_id === 2 || !values.role_id}
            >
              <option>Select from Reporter</option>

              {data?.map((e, id) => {
                if (e.role_id === 2 && values.role_id === 3) {
                  return (
                    <option value={e.id} key={id}>
                      {e.name}
                    </option>
                  );
                } else return null;
              })}
            </select>
            <br />
            {errors.reporting_person_id && (
              <b className="is-danger">{errors.reporting_person_id}</b>
            )}
          </div>
          <div className="first_last_name">
            <div className="first_name">
              <label className="form-label">Password</label>
              <br />
              <input
                className="form-input-field-name"
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password || ""}
                required
              />
              <br />

              {errors.password && (
                <b className="is-danger">{errors.password}</b>
              )}
            </div>
            <div className="first_name">
              <label className="form-label">Confirm Password</label>
              <br />
              <input
                className="form-input-field-name"
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                value={values.confirmPassword || ""}
                required
              />
              <br />
              {errors.confirmPassword && (
                <b className="is-danger">{errors.confirmPassword}</b>
              )}
            </div>
          </div>
        </form>
      </div>
      <div className="form-img">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={imageUploader}
          style={{
            display: "none",
          }}
        />

        <div
          className="form-img-input"
          onClick={() => imageUploader.current.click()}
        >
          <img
            ref={uploadedImage}
            value
            alt=""
            style={{
              width: "100%",
              height: "100%",
              position: "absoulte",
            }}
          />
          {reviews && <b className="is-danger">{reviews}</b>}
        </div>

        <div className="image-wrapper">
          <p className="form-img-title">Select display images to show</p>
          <p className="form-img-text">
            Image should be of following formats only, .jpeg, .png, .pdf.
            Maximum allowed image size is 300kb
          </p>
        </div>
      </div>
      <hr className="hr"></hr>
      <div className="btn-wrapper">
        <button
          id="cancelBtn"
          className="form-btn-cancel "
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
        <button
          className="form-submit-btn"
          type="submit"
          onClick={() => {
            reviewsHandler();
            handleSubmit();
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
}
export default USer;
