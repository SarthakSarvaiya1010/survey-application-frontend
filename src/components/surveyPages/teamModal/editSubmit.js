import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putUserEditData } from "../../../redux/action/userDataAction/putEditData";

const EditSubmit = (
  EditValidate,
  img,
  uploadedImage,
  setShowEdit,
  notify,
  emailError
) => {
  const editData = useSelector((state) => state?.surveyUser?.editDataR);
  const [values, setValues] = useState(editData);
  const [errors, setErrors] = useState({});
  const data = useSelector((state) => state?.surveyUser.fetchUserReducer);
  let Edits = data?.find((e) => e.email === values.email);

  const dispatch = useDispatch();



  useEffect(() => {
    setValues(editData)
  }, [editData,values])
  let newImg = img || editData.image_src;
  const id = values.role_id === 2 ? 0 : values.reporting_person_id;
  const formData = new FormData();
  let dataval =
    Object.keys(errors).length === 0 && errors.constructor === Object;
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("role_id", values.role_id);
    formData.append("password", values.password);
    formData.append("phone", values.phone);
    formData.append("reporting_person_id", id);
    formData.append("confirmPassword", values.confirmPassword);
    formData.append("image_src", newImg);
    formData.append("last_name", values.last_name);

    if (editData.email === Edits?.email) {
      dispatch(putUserEditData(editData.id, formData));
      setErrors(
        EditValidate(values, setValues, uploadedImage, setShowEdit, notify)
      );
    } else if (Edits?.email === values.email) {
      emailError();
    } else if (Edits?.email !== values.email) {
      dispatch(putUserEditData(editData.id, formData));
      setErrors(
        EditValidate(values, setValues, uploadedImage, setShowEdit, notify)
      );
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
