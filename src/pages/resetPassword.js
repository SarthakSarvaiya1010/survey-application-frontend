import React from "react";
import ResetPw from "../components/resetpassword/ResetPw";
import Header from "../components/loginPageUser/header/header";
import UserFooter from "../components/loginPageUser/footer/footer";

const ResetPassword = () => {
  return (
    <div>
      <Header />
      <ResetPw />
      <UserFooter />
    </div>
  );
};

export default ResetPassword;
