import React, { useState } from "react";
import "./addUser.css";
import "../../../assets/css/responsive.css";
import useForm from "./useForm";
import Validate from "./LoginFormValidationRules";
import { useSelector } from "react-redux";

function AddUSer({ setShow }) {
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const [reviews, setReviews] = useState(false);
  const [img, setImg] = useState();
  const data = useSelector((state) => state?.surveyUser.fetchUserReducer);

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
      setReviews("select image.");
      return false;
    }
  };
  const { values, errors, handleChange, handleSubmit } = useForm(
    Validate,
    img,
    setShow
  );
  return (
    <div className="modal_container">
      <div className="main_container_add">
        <h4 className="form_container">Add new user</h4>
        <hr />
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
            </p>
            <p className="form-img-text2">
              Maximum allowed image size is 300kb
            </p>
          </div>
        </div>
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
                  placeholder="Enter first name"
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
                  className="form-input-field-lastName"
                  type="text"
                  name="last_name"
                  placeholder="Enter last name"
                  onChange={handleChange}
                  value={values.last_name || ""}
                  required
                />
                <br />
                {errors.last_name && (
                  <b className="is-danger-lastName">{errors.last_name}</b>
                )}
              </div>
            </div>

            <label className="form-label">Email Address</label>
            <input
              autoComplete="off"
              className="form-input-field"
              type="email"
              name="email"
              placeholder="Enter email eddress"
              onChange={handleChange}
              value={values.email || ""}
              required
            />

            {errors.email && <b className="is-danger">{errors.email}</b>}

            <label className="phone">Phone Number</label>

            <input
              autoComplete="off"
              className="form-input-field"
              type="text"
              name="phone"
              placeholder="Enter phone number"
              onChange={handleChange}
              value={values.phone || ""}
              required
              maxlength="10"
            />

            {errors.phone && <b className="is-danger">{errors.phone}</b>}

            <label className="phone">Designation</label>

            <div>
              <select
                className="select"
                onChange={handleChange}
                value={values.role_id || ""}
                name="role_id"
              >
                <option>Select from dropdown</option>
                <option value={3}>Worker</option>
                <option value={2}> Supervisor</option>
              </select>

              {errors.role_id && <b className="is-danger">{errors.role_id}</b>}
            </div>

            <label className="Reporting">Reporting to</label>

            <div>
              <select
                className="select"
                onChange={handleChange}
                value={values.reporting_person_id || ""}
                name="reporting_person_id"
                disabled={values.role_id === 2 || !values.role_id}
              >
                <option>Select from dropdown</option>
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

            <div className="first_last_password">
              <div className="first_name">
                <label className="form-label">Password</label>
                <br />
                <input
                  className="form-input-field-password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password || ""}
                  placeholder="Enter password"
                  required
                />
                <br />

                {errors.password && (
                  <b className="is-danger">{errors.password}</b>
                )}
              </div>
              <div className="conform-password">
                <label className="form-label">Confirm Password</label>
                <br />
                <input
                  className="form-input-field-name"
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={values.confirmPassword || ""}
                  placeholder="Conform password"
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
        <hr className="hr"></hr>
        <div className="btn-wrapper">
          <button
            id="cancelBtn"
            className="form-btn-cancel"
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={() => {
              handleSubmit();
              reviewsHandler();
            }}
            className="form-submit-btn"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUSer;
