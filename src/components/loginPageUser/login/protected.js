import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Protected = (props) => {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    let admin = localStorage.getItem("UserRole");
    if (admin !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <Component />
    </div>
  );
};
