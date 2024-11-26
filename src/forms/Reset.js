import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";
import FitnessApi from "../common/api";

export default function Reset({ loginreset }) {
  const { email, setPage } = useContext(UserContext);
  const history = useHistory();
  const initialState = {
    password: "",
    confirmpassword: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Reset password", formData);
      console.log("Reset email", email);
      if (formData.password !== formData.confirmpassword) {
        alert("Passwords do not match");
        return;
      }
      setPage("recovered");
      const token = await FitnessApi.resetPassword({ ...formData, email });
      loginreset(token);
      setFormData(initialState);
      history.push("/");
    } catch (e) {
      console.log("Error", e);
    }
  };

  return (
    <div className="Reset">
      <div className="d-flex flex-column align-items-center justify-content-center px-3 py-4 mx-auto h-100">
        <div className="w-100 p-4 bg-white rounded shadow-sm border-md mt-0 sm-max-w-md">
          <h2 className="mb-3 h5 fw-bold text-dark text-center">
            Change Password
          </h2>
          <form className="mt-3" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmpassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                placeholder="••••••••"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <button className="btn btn-primary w-100">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
}
