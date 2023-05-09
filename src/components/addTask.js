import React, { useState } from "react";
import "./addTask.css";
import { dimg } from "../assets/img/Img";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTask = () => {
  const imageUploader = React.useRef(null);
  const [showModal, setShowModal] = useState(true);
  const [startDate, setStartDate] = useState();
  const [values, setValues] = useState({});
  const [file, setFile] = useState();

  const handleImg = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  const handleChange = (e) => {
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  let data = {
    value: values,
    date: startDate,
    img: file,
  };

  const submit = () => {
    console.log(data);
    setValues(" ");
    setStartDate(undefined);
    setFile(undefined);
  };

  return (
    <>
      {showModal && (
        <div className="addTask-container">
          <div className="addTask-wrapper">
            <div className="addTask-header">
              <p className="addTask-title">
                <b>Add task</b>
              </p>
              <span
                className="close-icon"
                onClick={() => setShowModal(false)}
              ></span>
            </div>
            <div className="first-input-row">
              <div className="first-input-type">
                <span className="addTask-name">Name</span>
                <input
                  type="text"
                  value={values.task_name || ""}
                  name="task_name"
                  placeholder="Enter task name"
                  className="addTask-input-name"
                  onChange={handleChange}
                />
              </div>
              <div className="assign-row">
                <span className="addTask-assign">Assign to</span>
                <select
                  className="addTask-select-assign"
                  value={values.assignee || " "}
                  name="assignee"
                  onChange={handleChange}
                >
                  <option value="volvo"> Select assignee </option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
              <div className="priority-row">
                <span className="adTask-priority"> Priority </span>
                <select
                  className="addTask-select-assign"
                  value={values.priority || " "}
                  name="priority"
                  onChange={handleChange}
                >
                  <option value="volvo"> Select priority </option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
            </div>

            <div className="task-wrappwer">
              <span className="task-description">Task description</span>
              <textarea
                type="text"
                className="task-textarea"
                value={values.text_area || ""}
                name="text_area"
                onChange={handleChange}
              />
            </div>

            <div className="date-row">
              <div className="hours-container">
                <span className="hour-title">Estimated hours</span>
                <div className="hour-flex">
                  <input
                    type="number"
                    placeholder="00"
                    min="00"
                    max="60"
                    className="hour-first"
                    value={values.minutes || " "}
                    name="minutes"
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    placeholder="00"
                    min="00"
                    max="12"
                    value={values.hours || " "}
                    name="hours"
                    className="hour-second"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="date-wrapper">
                <span className="date-title ">Due date</span>
                <DatePicker
                  className="date-input"
                  placeholderText="DD/MM/YYYY"
                  selected={startDate}
                  onChange={(Date) => setStartDate(Date)}
                />
              </div>
              <div className="addTitle-img-containner">
                <span className="image-title">Upload image</span>
                <div className="selected-img">
                  {file === undefined ? (
                    <img className="uplode-img" alt="" src={dimg} />
                  ) : (
                    <>
                      <span
                        className="closeTask"
                        onClick={() => setFile(undefined)}
                      ></span>
                      <img className="uplode-img" alt="" src={file} />
                    </>
                  )}
                  <div
                    className="select-img-input"
                    onClick={() => imageUploader.current.click()}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImg}
                      ref={imageUploader}
                      style={{
                        display: "none",
                      }}
                    />
                    <p className="click-title">Click to add images</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lavel">
              <span className="lavel-title">Level</span>
              <select
                name="lavel"
                value={values.lavel || ""}
                onChange={handleChange}
                className="addTask-select-assign"
              >
                <option value="volvo"> Select level </option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
            </div>

            <div className="addTask-btn-wrapper">
              <button
                className="btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="btn-submit" onClick={submit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTask;
