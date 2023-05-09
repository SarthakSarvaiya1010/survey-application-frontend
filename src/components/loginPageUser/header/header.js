import React from "react";
import { logo } from "../../../assets/img/Img";
import "./header.css";

const Header = () => {
  return (
    <div className="header-main">
      <div className="header-wrapper">
        <img className="image-header" src={logo} alt="Hello" />
        <h2 className="login-title">Survey</h2>
      </div>
    </div>
  );
};
export default Header;
