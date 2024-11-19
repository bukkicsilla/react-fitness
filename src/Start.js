import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "./UserContext";
import "./Start.css";
//import { Link } from "react-router-dom/cjs/react-router-dom.min";
const Start = ({ logout }) => {
  let { currentUser } = useContext(UserContext);
  const welcome = currentUser ? `Hello ${currentUser.username}` : "Fitness Fun";
  return (
    <div className="Start">
      <h1>{welcome}</h1>
      <div className="credentials">
        {currentUser && (
          <Link to="/" onClick={logout} className="tooltip-message">
            <i
              style={{ color: "gold", fontSize: "1.5rem", marginRight: "1rem" }}
              className="fa fa-sign-out"
            ></i>
            <span className="tooltip">Logout</span>
          </Link>
        )}
        {!currentUser && (
          <Link to="/login" className="tooltip-message">
            <i
              style={{
                color: "gold",
                fontSize: "1.5rem",
                marginRight: "1rem",
              }}
              className="fa fa-sign-in"
            ></i>
            <span className="tooltip">Login</span>
          </Link>
        )}
        <Link to="/about" className="tooltip-message">
          <i
            style={{ color: "gold", fontSize: "1.5rem" }}
            className="fa fa-book"
          ></i>
          <span className="tooltip">About</span>
        </Link>
      </div>
    </div>
  );
};
export default Start;
