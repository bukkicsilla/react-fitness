import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import BestVideos from "./BestVideos";
import "./Profile.css";

const Profile = ({ deleteProfile }) => {
  let { currentUser } = useContext(UserContext);
  return (
    <div className="Profile-two-containers">
      <div className="Profile-container-info" id="Profile-profile">
        <div>
          <h1 className="Profile-heading">Welcome {currentUser.username}!</h1>
        </div>
        <div>
          {/*<h2 className="user">Your profile info:</h2>*/}
          <h4 className="Profile-user">First name: {currentUser.first_name}</h4>
          <h4 className="Profile-user">Last name: {currentUser.last_name}</h4>
          <h4 className="Profile-user">Email: {currentUser.email}</h4>
        </div>
      </div>
      <h3 className="Profile-h3"> One of the best rated videos.</h3>
      <BestVideos />
      <div className="Profile-container-edit-delete">
        <div>
          <Link className="btn btn-edit" to="/editprofile">
            Edit Profile
          </Link>
        </div>
        <div>
          <button className="btn btn-delete" onClick={deleteProfile}>
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
