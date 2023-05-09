import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { editUserActions } from "../../../features/user/surveyUserSlice";

const EditSubmit = (EditValidate, img, setShowEdit) => {
  const editData = useSelector((state) => state?.surveyUser.editDataR);
  const [values, setValues] = useState(
    editData
      ? {
          deleteflag: editData.deleteflag,
          email: editData.email,
          id: editData.id,
          image_src: editData.image_src,
          isactive: editData.isactive,
          last_name: editData.last_name,
          name: editData.name,
          password: editData.password,
          confirmPassword: editData.password,
          phone: editData.phone,
          reporting_person_id: editData.reporting_person_id,
          reporting_person_name: editData.reporting_person_name,
          role: editData.role,
          role_id: editData.role_id,
          updateddate: editData.updateddate,
          uuid: editData.uuid,
        }
      : editData
  );
  const [errors, setErrors] = useState({});

  const edit_Data = useSelector((state) => state?.surveyUser?.putUserEditDataR);
  const errorRegister = useSelector(
    (state) => state?.surveyUser?.putUserEditDataR
  );

  useEffect(() => {
    setValues({
      deleteflag: editData.deleteflag,
      email: editData.email,
      id: editData.id,
      image_src: editData.image_src,
      isactive: editData.isactive,
      last_name: editData.last_name,
      name: editData.name,
      password: editData.password,
      confirmPassword: editData.password,
      phone: editData.phone,
      reporting_person_id: editData.reporting_person_id,
      reporting_person_name: editData.reporting_person_name,
      role: editData.role,
      role_id: editData.role_id,
      updateddate: editData.updateddate,
      uuid: editData.uuid,
    });
  }, [editData]);
  useEffect(() => {
    if (edit_Data?.status === "success") {
      toast.success(edit_Data?.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else if (
      errorRegister?.status === "error" ||
      errorRegister?.message?.name === "error"
    ) {
      toast.error("Error to submit the data");
    }
  }, [edit_Data, errorRegister?.message?.name, errorRegister?.status]);
  const dispatch = useDispatch();

  const id = values.role_id === 2 ? 0 : values.reporting_person_id;
  const formData = new FormData();
  let dataval =
    Object.keys(errors).length === 0 && errors.constructor === Object;

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    let imagefile = editData.image_src;
    let filedata = img ? img : imagefile;

    setErrors(EditValidate(values));
    if (
      values.name !== "" &&
      values.email !== "" &&
      values.role_id !== "" &&
      values.role_id !== "0" &&
      values.password !== "" &&
      values.phone !== "" &&
      id !== "" &&
      values.password !== "" &&
      filedata !== "" &&
      values.last_name !== "" &&
      values.confirmPassword !== "" &&
      values?.confirmPassword
        ? values?.password === values.confirmPassword
        : values?.password === values.password
    ) {
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("role_id", values.role_id);
      formData.append("password", values.password);
      formData.append("phone", values.phone);
      formData.append("reporting_person_id", id);
      formData.append("confirmPassword", values.password);
      formData.append("image_src", filedata);
      formData.append("last_name", values.last_name);
      setErrors(EditValidate(values));
      dispatch(editUserActions(formData));
    }
  };
  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    if (!dataval) {
      setErrors(EditValidate(values));
    }
  };
  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

export default EditSubmit;
