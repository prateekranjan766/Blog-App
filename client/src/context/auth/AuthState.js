import { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "./../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  USER_LOADED,
  AUTH_ERROR,
} from "../types.js";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //User Loaded
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };
  //Register
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", formData, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data.token });
      loadUser();
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    }
  };

  //Login
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth", formData, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });

      loadUser();
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
    }
  };

  //Logout
  const logout = () => {
    dispatch({ type: LOGOUT });
  };
  //Clear errors
  const clearError = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        clearError,
        login,
        logout,
        loadUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
