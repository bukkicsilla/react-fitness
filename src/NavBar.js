import { NavLink } from "react-router-dom";
import "./NavBar.css";
const NavBar = () => {
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
