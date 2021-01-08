import React, { useContext } from "react";
import AlertContext from "./../../context/alert/alertContext";
import "./Alerts.scss";

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;
  return (
    <div className="alerts">
      {alerts.length > 0 &&
        alerts.map((alert) => (
          <div className={`alerts__${alert.type}`}>
            <i className="fas fa-exclamation-triangle"></i>
            {alert.msg}
          </div>
        ))}
    </div>
  );
};

export default Alerts;
