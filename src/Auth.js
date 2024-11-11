import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
const Auth = () => {
  return (
    <div className="Auth-container" id="profile">
      <p className="auth">
        <span>Do you have an account?</span>
        <Link className="Auth-link" to="/login">
          Login here
        </Link>
      </p>
      <p className="auth">
        Don't have an account?
        <Link className="Auth-link" to="/signup">
          Register here
        </Link>
      </p>
    </div>
  );
};
export default Auth;
