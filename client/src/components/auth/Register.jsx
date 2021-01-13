import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./../../context/auth/authContext";
import AlertContext from "./../../context/alert/alertContext";
import "./Register.scss";

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { isAuthenticated, register, error, clearError } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/all-posts");
    }
    if (error === "User already exists!") {
      setAlert({ msg: error, type: "danger" });
      clearError();
    }
    //eslint-disable-next-line
  }, [isAuthenticated, error, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password1: "",
  });
  const { name, email, password, password1 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || password1 === "") {
      setAlert("Please fill all fields");
    } else if (password !== password1) {
      setAlert({ msg: "Passwords does not match", type: "danger" });
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };
  return (
    <>
      <div className="register">
        <h1>
          Account <span>Register</span>
        </h1>
        <form onSubmit={onSubmit}>
          <label>
            <i className="fas fa-user"></i>
            <input
              type="text"
              value={name}
              name="name"
              placeholder="Name"
              onChange={onChange}
              required
            />
          </label>
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
          <label>
            <i className="fas fa-redo-alt"></i>
            <input
              type="password"
              value={password1}
              name="password1"
              placeholder="Confirm Password"
              onChange={onChange}
              required
            />
          </label>
          <input className="register__submit" type="submit" value="Register" />
        </form>
      </div>
      <div className="register__link">
        <h2>
          Already a user?
          <Link className="register__link--link" to="/login">
            Login
          </Link>
        </h2>
      </div>
    </>
  );
};

export default Register;
