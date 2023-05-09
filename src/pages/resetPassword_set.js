import React from "react";
import Header from "../components/loginPageUser/header/header";
import UserFooter from "../components/loginPageUser/footer/footer";
import ResetPasswordToken from "../components/resetpassword/resetPasswordToken";

const ResetPasswordSet = () => {
  return (
    <div>
      <Header />
      <ResetPasswordToken />
      <UserFooter />
    </div>
  );
};

export default ResetPasswordSet;
