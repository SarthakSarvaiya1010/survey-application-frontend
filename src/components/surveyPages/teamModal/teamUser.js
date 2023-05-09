import React, { useEffect, useState } from "react";
import { fetchUserAction } from "../../../redux/action/userDataAction/fetchUser";
import EditSubmit from "./editSubmit";
import EditValidate from "./editFormValidation";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../../../assets/img/Img";

function TeamUser({ setShowEdit, notify, emailError }) {
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const [reviews, setReviews] = useState(false);
  const [img, setImg] = useState();
  const dispatch = useDispatch();
  const editData = useSelector((state) => state?.surveyUser.editDataR);
  const data = useSelector((state) => state?.surveyUser.fetchUserReducer);
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

  const { values, errors, handleChange } = EditSubmit(
    EditValidate,
    img,
    uploadedImage,
    setShowEdit,
    notify,
    emailError
  );
  return (
    <div className="modal_container">
      <div className="team_user_main_container">
        <h4 className="form_container">User Details</h4>
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
            disabled
          />
          <div
            className="form-img-input"
            onClick={() => imageUploader.current.click()}
          >
            {editData.image_src === null ? (
              <img className="null-image-person" src={user} alt="person" />
            ) : (
              <img
                ref={uploadedImage}
                className="image-person"
                src={"data:image/png;base64," + editData.image_src}
                alt="person"
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absoulte",
                }}
              />
            )}
            {/* <img
              ref={uploadedImage}
              src={"https://survey-api-m9x0.onrender.com/" + editData.image_src}
              style={{
                width: "100%",
                height: "100%",
                position: "absoulte",
              }}
            /> */}
            {reviews && <b className="is-danger">{reviews}</b>}
          </div>

          {/* <div className="image-wrapper">
            <p className="form-img-title">Select display images to show</p>
            <p className="form-img-text">
              Image should be of following formats only, .jpeg, .png, .pdf.
            </p>
            <p className="form-img-text2">
              Maximum allowed image size is 300kb
            </p>
          </div> */}
        </div>
        <div className="form-wrapper">
          <form id="contact-form" method="post" className="form-group">
            <div className="first_last_name">
              <div className="first_name">
                <label className="form-label">First name</label>
                <br />
                <input
                  autoComplete="off"
                  className="form-input-field-name"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={values.name || ""}
                  disabled
                />
                <br />

                {errors.name && <b className="is-danger_name">{errors.name}</b>}
              </div>
              <div className="first_name">
                <label className="form-label">Last name</label>
                <br />
                <input
                  autoComplete="off"
                  className="form-input-field-lastName"
                  type="text"
                  name="last_name"
                  onChange={handleChange}
                  value={values.last_name || ""}
                  disabled
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
              onChange={handleChange}
              value={values.email || ""}
              disabled
            />

            {errors.email && <b className="is-danger">{errors.email}</b>}

            <label className="phone">Phone Number</label>

            <input
              autoComplete="off"
              className="form-input-field-phone"
              type="text"
              name="phone"
              onChange={handleChange}
              value={values.phone || ""}
              disabled
            />

            {errors.phone && <b className="is-danger">{errors.phone}</b>}

            <label className="phone">Designation</label>

            <div>
              <select
                className="select"
                onChange={handleChange}
                value={values.role_id || ""}
                name="role_id"
                disabled
              >
                <option>Select from Designation</option>
                <option value={3}>Worker</option>
                <option value={2}> Supervisor</option>
              </select>
              <br />
              {errors.role_id && <b className="is-danger">{errors.role_id}</b>}
            </div>
            <label className="Reporting">Reporting to</label>

            <div>
              <select
                className="select"
                onChange={handleChange}
                value={values.reporting_person_id || ""}
                name="reporting_person_id"
                disabled
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
                  disabled
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
                  value={values.password || ""}
                  disabled
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
            onClick={() => setShowEdit(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
export default TeamUser;
