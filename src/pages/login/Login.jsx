import { useContext, useEffect, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
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
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!res.ok) {
        // backend likely returns error JSON
        const errData = await res.json();
        throw errData;
      }

      const data = await res.json();

      dispatch({ type: "LOGIN_SUCCESS", payload: data.details });
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error });
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
