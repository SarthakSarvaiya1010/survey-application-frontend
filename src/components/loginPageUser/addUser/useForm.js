import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInUserAction } from "../../../redux/action//loginAction/loginA";
import { useNavigate } from "react-router-dom";
import { fetchUserAction } from "../../../redux/action/userDataAction/fetchUser";

const useForm = (Validate, img) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [validateData, setValidatedata] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserAction());
  }, [dispatch]);

  const formData = new FormData();
  const RegisterData = useSelector(
    (state) => state?.signInUserReducer?.data?.data
  );
  const allUserData = useSelector((state) => state?.fetchUserReducer?.data);
  let validEmai = allUserData?.filter((e) => e.email === values.email);
  let validEmail = validEmai?.length;
  console.log(validEmail);
  const id = values.role_id === 2 ? 0 : values.reporting_person_id;
  useEffect(() => {
    if (RegisterData?.status === "success") {
      navigate("/");
    }
  }, [RegisterData?.status, navigate]);

  useEffect(() => {
    if (validateData) {
      setErrors(Validate(values));
    }
  }, [Validate, validateData, values]);
  const handleSubmit = (event) => {
    setValidatedata(true);
    if (event) event.preventDefault();
    setErrors(Validate(values));
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("role_id", values.role_id);
    formData.append("password", values.password);
    formData.append("phone", values.phone);
    formData.append("reporting_person_id", id);
    formData.append("confirmPassword", values.confirmPassword);
    formData.append("image_src", img);
    formData.append("last_name", values.last_name);
    dispatch(signInUserAction(formData));

    setErrors(Validate(values, validEmail));
  };
  const handleChange = (event) => {
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
