import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./../../context/auth/authContext";
import AlertContext from "./../../context/alert/alertContext";
import "./Login.scss";

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { isAuthenticated, error, clearError, login } = authContext;
  const { setAlert } = alertContext;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/all-posts");
    }
    if (error === "Invalid Credentials!") {
      setAlert({ msg: "Invalid Credentials!", type: "danger" });
      clearError();
    }

    //eslint-disable-next-line
  }, [isAuthenticated, props.history, error]);

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert({ msg: "Please enter all fields", type: "danger" });
    } else {
      login({
        email,
        password,
      });
    }
  };
  return (
    <>
      <div className="login">
        <h1>
          Account <span>Login</span>
        </h1>
        <form onSubmit={onSubmit}>
          <label>
            <i className="fas fa-envelope-open"></i>
            <input
              type="text"
              value={email}
              name="email"
              placeholder="Email"
              onChange={onChange}
              required
            />
          </label>
          <label>
            <i className="fas fa-lock"></i>
            <input
              type="password"
              value={password}
              name="password"
              placeholder="Password"
              onChange={onChange}
              required
            />
          </label>
          <input className="login__submit" type="submit" value="Login" />
        </form>
      </div>
      <div className="login__link">
        <h3>
          New Here?<Link to="/register">Register for free</Link>
        </h3>
      </div>
    </>
  );
};

export default Login;
