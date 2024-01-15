import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { jwtDecode } from "jwt-decode";

import "./LoginPage.css";

const LoginPage = () => {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token != null) {
      navigation("/homepage");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://junior-test.mntzdevs.com/api/login/",
        formData
      );
      const token = response.data.jwt;
      localStorage.setItem("jwt", token);
      window.location.assign("/homepage");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="login-wrapper">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h2>LOGIN USER</h2>
          <hr />
          <div>
            <label htmlFor="username">User Name:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
