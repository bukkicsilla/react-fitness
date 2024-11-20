import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "./UserContext";
import "./Footer.css";

const Footer = ({ logout }) => {
  let { currentUser } = useContext(UserContext);
  //currentUser = { first_name: "Lua", username: "lua" };
  return (
    <div className="Footer">
      {/*<a href="https://flask-workout.onrender.com/" target="_blank">
        Workout
      </a>*/}
      <NavLink exact to="/about">
        Guide
      </NavLink>
      {currentUser && (
        <>
          <NavLink exact to="/profile">
            Profile
          </NavLink>
          <Link className="nav-link" to="/" onClick={logout}>
            Logout
          </Link>
        </>
      )}
    </div>
  );
};
export default Footer;
