import "./Login.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignInAdminMutation } from "../../../context/api/userApi";
import { useDispatch } from "react-redux";
import { setToken } from "../../../context/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("abubakr");
  const [password, setPassword] = useState("12345677");
  const [loading, setLoading] = useState(false);
  const [signIn, { data, isError, isSuccess }] = useSignInAdminMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken(data?.innerData?.token));
      navigate("/admin/customers");
    }
  }, [isSuccess, isError, dispatch, navigate, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    signIn({ username, password }).finally(() => setLoading(false));
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login to Account</h2>
        <p className="login-subtitle">
          Please enter your username and password to continue
        </p>
        <div className="login-input-group">
          <label htmlFor="username" className="login-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login-input-group">
          <label htmlFor="password" className="login-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Loading..." : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default Login;
