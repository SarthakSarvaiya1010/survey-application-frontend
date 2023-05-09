import React from "react";
import Login from "../components/loginPageUser/login/login";
import Header from "../components/loginPageUser/header/header";
import UserFooter from "../components/loginPageUser/footer/footer";

const LoginPage = () => {
  return (
    <div>
      <Header />
      <Login />
      <UserFooter />
    </div>
  );
};

export default LoginPage;
