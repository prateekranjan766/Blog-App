import React from "react";
import logo from "./../../loading-spinner.png";
import "./Loading.scss";

const Loading = () => {
  return <img className="loading" src={logo} alt="Loading..." />;
};

export default Loading;
