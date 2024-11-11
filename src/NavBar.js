import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "./UserContext";
import "./NavBar.css";

const NavBar = () => {
  let { currentUser } = useContext(UserContext);
  //currentUser = { first_name: "Lua", username: "lua" };
  return (
    <div className="NavBar">
      <NavLink exact to="/">
        Fitness
      </NavLink>
      {currentUser && (
        <NavLink exact to="/myvideos">
          My Videos
        </NavLink>
      )}
      {currentUser && (
        <NavLink exact to="/playlists">
          Playlists
        </NavLink>
      )}
      {!currentUser && (
        <>
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-link" to="/signup">
            Signup
          </NavLink>
        </>
      )}
    </div>
  );
};
export default NavBar;
