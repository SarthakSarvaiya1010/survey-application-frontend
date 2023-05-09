import React, { useState, useEffect } from "react";
import "./adminFlow.css";
import { user } from "../../../assets/img/Img";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import SignIn from "../../admin/addUser/AddUser";
import EditUser from "../../admin/editUser/editUser";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import EscapeOutside from "react-escape-outside";
import "../../../assets/css/responsive.css";
import { userDataStatic } from "../../common/data";
import DeleteModal from "../deleteUser/deleteModal";
import {
  fetchUserActions,
  getDeleteDataAction,
  getEditDataAction,
} from "../../../features/user/surveyUserSlice";

const AdminFlow = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state?.surveyUser?.toggle);
  const userData =
    useSelector((state) => state?.surveyUser?.fetchUserReducer) || [];

  const deleteResponse = useSelector(
    (state) => state?.surveyUser?.deleteUserById
  );

  useEffect(() => {
    if (deleteResponse?.statusCode === "200") {
      toast.success(deleteResponse?.message);
    } else {
      toast.error(deleteResponse);
    }
  }, [deleteResponse]);
  const count = Object.keys(userData).length;

  useEffect(() => {
    dispatch(fetchUserActions());
    window.scrollTo(0, 0);
  }, [dispatch]);

  const Edit = (data) => {
    window.scrollTo(0, 0);
    dispatch(getEditDataAction(data));
    localStorage.setItem("editId", data.id);
  };

  const Delete = (data) => {
    setModalOpen(true);
    dispatch(getDeleteDataAction(data));
  };

  return (
    <>
      <div className="content">
        <div className="adminFlow">
          <ToastContainer
            position="top-center"
            className="ToastContainer"
            autoClose={1000}
          />
          <div className="adminFlow-user">
            <p className="adminFlow-title">Company name’s team ({count})</p>
            <span>
              <button
                className="adminFlow-button"
                onClick={() => {
                  setShow(true);
                }}
              >
                +Add new
              </button>
            </span>
          </div>
          <EscapeOutside onEscapeOutside={() => setShow(false)}>
            <div> {show && <SignIn setShow={setShow} />}</div>
          </EscapeOutside>
          <EscapeOutside onEscapeOutside={() => setShowEdit(false)}>
            <div>{showEdit && <EditUser setShowEdit={setShowEdit} />}</div>
          </EscapeOutside>
          <EscapeOutside>
            {modalOpen && <DeleteModal setOpenModal={setModalOpen} />}
          </EscapeOutside>
          {toggle && (
            <div className="user-map">
              {userData !== undefined &&
                userData &&
                userData?.map((e, id) => {
                  return (
                    <div className="user" key={id}>
                      <div className="user-profile">
                        {e.image_src === null ? (
                          <div className="user-img-null">
                            <img src={user} alt="alter" />
                          </div>
                        ) : (
                          <div className="user-img">
                            <img
                              src={"data:image/png;base64," + e.image_src}
                              alt="Hello"
                            />
                          </div>
                        )}
                      </div>
                      <p className="user-details">{e.name}</p>
                      <div className="user-report">
                        <div className="user_name_Id">
                          {e.reporting_person_name === null ? (
                            <b className="reporting_person_name">{e.role}</b>
                          ) : (
                            <div>
                              <p className="reporting_to">reporting To</p>
                              <p className="reporting_person_name">
                                {e.reporting_person_name}
                              </p>
                            </div>
                          )}
                        </div>
                        <div>
                          <span
                            className="delete-icon"
                            // onClick={() => deleteUser(e.id, e)}
                            onClick={() => {
                              Delete(e);
                            }}
                          >
                            <MdDelete />
                          </span>
                          <span
                            className="edit-icon"
                            onClick={() => {
                              Edit(e);
                              setShowEdit(true);
                            }}
                          >
                            <FiEdit />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {userData === undefined &&
                userDataStatic &&
                userDataStatic?.map((e, id) => {
                  return (
                    <div className="user" key={id}>
                      <div className="user-profile">
                        {e.image_src === null ? (
                          <div className="user-img-null">
                            <img src={user} alt="alter" />
                          </div>
                        ) : (
                          <div className="user-img">
                            <img
                              src={"data:image/png;base64," + e.image_src}
                              alt="Hello"
                            />
                          </div>
                        )}
                      </div>
                      <p className="user-details">{e.name}</p>
                      <div className="user-report">
                        <div>
                          <div className="user_name_Id">
                            {e.reporting_person_name === null ? (
                              <b className="reporting_person_name">{e.role}</b>
                            ) : (
                              <div>
                                <p className="reporting_to">reporting To</p>
                                <br />
                                <p className="reporting_person_name">
                                  {e.reporting_person_name}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <span
                            className="delete-icon"
                            // onClick={() => deleteUser(e.id, e)}
                            // href="#myModal"
                            // class="trigger-btn"
                            // data-toggle="modal"
                          >
                            <MdDelete />
                          </span>
                        </div>
                        <div>
                          <span className="edit-icon" onClick={() => Edit(e)}>
                            <FiEdit />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default AdminFlow;
