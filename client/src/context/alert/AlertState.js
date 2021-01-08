import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { REMOVE_ALERT, SET_ALERT } from "./../types";

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  //Set Alert
  const setAlert = ({ msg, type, timeout = 5000 }) => {
    const id = Math.floor(Math.random() * 10) + Math.floor(Math.random() * 9);
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });
    //Remove Alert
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider value={{ alerts: state, setAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
