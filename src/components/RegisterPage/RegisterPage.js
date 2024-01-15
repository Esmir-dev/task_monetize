import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./RegisterPage.css";

const RegisterPage = () => {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    repeatPassword: "",
    subscribeToNewsLetter: false,
    status: "active",
    gender: "male",
    yearOfBirth: 1900,
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token != null) {
      navigation("/homepage");
    }
  });
  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://junior-test.mntzdevs.com/api/register/",
        formData
      );
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
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  return (
    <div className="register-wrapper">
      <div className="register-form">
        <form onSubmit={handleSubmit}>
          <h2>REGISTER USER</h2>
          <hr />
          <div>
            <label htmlFor="username">User Name:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="repeatPassword">Repeat Password:</label>
            <input
              type="password"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="subscribeToNewsLetter">
              Subscribe to News Letter:
            </label>
            <input
              type="checkbox"
              name="subscribeToNewsLetter"
              value={formData.subscribeToNewsLetter}
              onChange={(e) => handleChange(e.target.name, e.target.checked)}
            />
          </div>
          <div className="gender-inputs">
            <label htmlFor="gender">Gender:</label>
            <input
              required
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <span>Male</span>

            <input
              required
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <span>Female</span>
          </div>
          <div>
            <label for="status">Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label>
              Year of Birth:
              <input
                type="number"
                name="yearOfBirth"
                min={1900}
                max={2024}
                value={formData.yearOfBirth}
                onChange={(e) =>
                  handleChange(e.target.name, parseInt(e.target.value))
                }
                required
              />
            </label>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
