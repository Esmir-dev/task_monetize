import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import "./Header.css";

const Header = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
      setId(decoded.id);
      setisAuthenticated(true);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setisAuthenticated(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="header">
      <div className="left-header">
        <div>Welcome</div>
      </div>
      <div className="right-header">
        {/*hamburger meni because of smaller devices*/}
        <div className="hamburger-menu" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul className={`menu ${showMenu ? "show" : ""}`}>
          <li className="nameAndId">
            {isAuthenticated && (
              <li>
                <p>{username}</p>
                <p>{id}</p>
              </li>
            )}
            <NavLink to="/">Home page</NavLink>
          </li>
          <li>
            <NavLink to="/products" style={{ fontWeight: "bold" }}>
              Products
            </NavLink>
          </li>
          {!isAuthenticated && (
            <li className="button-container">
              <NavLink to="/loginpage">
                <button className="login-button" style={{ fontWeight: "bold" }}>
                  Login
                </button>
              </NavLink>
            </li>
          )}
          {!isAuthenticated && (
            <li>
              <NavLink to="/registerpage">
                <button
                  className="register-button"
                  style={{ fontWeight: "bold" }}
                >
                  Register
                </button>
              </NavLink>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <NavLink to="/loginPage">
                <button
                  className="register-button"
                  style={{ fontWeight: "bold" }}
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
