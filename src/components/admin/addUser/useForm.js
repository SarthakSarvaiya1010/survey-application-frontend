import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { signInUserActions } from "../../../features/user/surveyUserSlice";

const useForm = (validate, img, setShow) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [validateData, setValidatedata] = useState(null);
  const RegisterData = useSelector(
    (state) => state?.surveyUser?.signInUserReducer
  );
  const errorRegister = useSelector(
    (state) => state?.surveyUser?.signInUserReducer
  );

  useEffect(() => {
    if (RegisterData?.status === "success") {
      toast.success(RegisterData?.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      setShow(false);
    } else if (errorRegister?.statusCode === "400") {
      toast.error(errorRegister?.message);
      setShow(true);
    }
  }, [
    RegisterData?.message,
    RegisterData?.status,
    errorRegister?.message,
    errorRegister?.statusCode,
    setShow,
  ]);
  const data = useSelector((state) => state?.surveyUser.fetchUserReducer);
  let validEmai = data.filter((e) => e.email === values.email);
  let validEmail = validEmai?.length;
  const dispatch = useDispatch();
  const id = values.role_id === 2 ? 0 : values.reporting_person_id;
  const formData = new FormData();

  useEffect(() => {
    if (validateData) {
      setErrors(validate(values));
    }
  }, [validate, validateData, values]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setValidatedata(true);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("role_id", values.role_id);
    formData.append("password", values.password);
    formData.append("phone", values.phone);
    formData.append("reporting_person_id", id);
    formData.append("confirmPassword", values.confirmPassword);
    formData.append("image_src", img);
    formData.append("last_name", values.last_name);
    dispatch(signInUserActions(formData));
    if (validEmail === 1) {
      toast.error("email is taken");
    } else {
      setErrors(validate(values));
    }
  };
  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};
export default useForm;
