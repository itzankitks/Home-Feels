import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [fieldErrors, setFieldErrors] = useState({
    username: false,
    password: false,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    // Clear error state when user starts typing
    setFieldErrors((prev) => ({ ...prev, [e.target.id]: false }));
  };

  const validateFields = () => {
    const errors = {
      username: !credentials.username,
      password: !credentials.password,
    };
    setFieldErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: { message: "Please fill in all fields" },
      });
      return;
    }

    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data.details });
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  // console.log(`user: ${JSON.stringify(user)}`);

  return (
    <div className="login">
      <div className="lContainer">
        <h1>Welcome Back</h1>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className={`lInput ${fieldErrors.username ? "error" : ""}`}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className={`lInput ${fieldErrors.password ? "error" : ""}`}
        />
        <button onClick={handleClick} className="lButton" disabled={loading}>
          {loading ? "Please wait..." : "Login"}
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
