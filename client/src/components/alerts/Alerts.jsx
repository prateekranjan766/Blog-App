import React, { useContext } from 'react';
import AlertContext from './../../context/alert/alertContext';
// import "./Alerts.scss";
import { Alert } from 'react-bootstrap';

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;
  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <Alert variant={alert.type}>
        <i className='fas fa-exclamation-triangle'></i>
        {alert.msg}
      </Alert>
    ))
  );
};

export default Alerts;
