import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import "./Profile.css";
const Profile = () => {
  let { currentUser, userId } = useContext(UserContext);
  return (
    <div className="Profile-two-containers">
      <div className="Profile-container-info" id="Profile-profile">
        <div>
          <h1 className="Profile-heading">Welcome {currentUser.username}!</h1>
        </div>
        <div>
          <h2 className="user">Your profile info:</h2>
          <h4 className="user">First name: {currentUser.first_name}</h4>
          <h4 className="user">Last name: {currentUser.last_name}</h4>
          <h4 className="user">Email: {currentUser.email}</h4>
        </div>
      </div>
      <div className="profile-container-edit-delete">
        <div>
          <a href="/users/update/{{user.id}}" className="btn btn-edit">
            Edit Profile
          </a>
        </div>
        <div>
          <a href="/users/delete/{{user.id}}" className="btn btn-delete">
            Delete Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
