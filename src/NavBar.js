import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "./UserContext";
import "./NavBar.css";

const NavBar = ({ logout }) => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="NavBar">
      <NavLink exact to="/">
        Fitness
      </NavLink>
      <NavLink exact to="/myvideos">
        My Videos
      </NavLink>
      <NavLink exact to="/playlists">
        Playlists
      </NavLink>
      <NavLink exact to="/profile">
        Profile
      </NavLink>
    </div>
  );
};
export default NavBar;
