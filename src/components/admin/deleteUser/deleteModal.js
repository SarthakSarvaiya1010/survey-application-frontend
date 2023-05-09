import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserActions } from "../../../features/user/surveyUserSlice";
import "./deleteModal.css";
import { FiX } from "react-icons/fi";

function DeleteModal({ setOpenModal }) {
  const dispatch = useDispatch();
  const deleteData = useSelector((state) => state?.surveyUser.deleteData);

  const deleteUser = (id, data) => {
    dispatch(deleteUserActions(id));
    setOpenModal(false);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return (
    <div className="modalBackground">
      <div className="deletemodalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <FiX />
          </button>
        </div>
        <div className="deletetitle">
          Are you sure you want to Delete these records?
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Cancel
          </button>
          <button
            id="cancelBtn"
            onClick={() => deleteUser(deleteData.id, deleteData)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
