/*******
 * Password reset functionality
 * https://www.youtube.com/watch?v=A8k4A7TuhDY&t=588s
 * https://github.com/ksekwamote/password_recovery/tree/master
 */
import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";
import { Card, CardBody, Form, Label, Input, Button } from "reactstrap";
import axios from "axios";
import "./Login.css";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** User login form.
 *
 * It shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to home route
 *
 * Routes -> Login
 * Routed as /login
 */

const Login = ({ login }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setEmail, setPage, email, setOTP } = useContext(UserContext);
  const history = useHistory();
  const INITIAL_STATE = {
    username: "",
    password: "",
    email: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  //const [formErrors, setFormErrors] = useState([]);
  console.log("Initial State:", INITIAL_STATE);
  React.useEffect(() => {
    setFormData(INITIAL_STATE);
  }, []); // Runs on mount

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  async function navigateToOtp() {
    if (formData.email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);
      setOTP(OTP);

      try {
        const result = await axios.post(`${BASE_URL}/send_recovery_email`, {
          OTP,
          recipient_email: formData.email,
        });
        //console.log("OTP result", result);
        setPage("otp");
        setEmail(formData.email);
      } catch (error) {
        console.log(error);
      }
      return;
    }
    //alert("Please enter your email");
  }
  /** Update form fields */

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      /*console.log("Email", formData.email);
      if (formData.email) {
        return;
      }*/
      let result = await login(formData);
      setFormData(INITIAL_STATE);
      // makes a POST request to Api.js and adds corresponding data to matching category in db.json
      if (result.success) {
        // imperatively redirect to correct page and refresh to see new data
        history.push("/");
      } else {
        //setFormErrors(result.errors);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Login col-md-5 offset-md-4 col-lg-4 offset-lg-4">
      <Card>
        <CardBody>
          <h1>Log In</h1>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="username">Username</Label>
            <Input
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            ></Input>
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            ></Input>
            {/*<span className="NewItemForm-message">
              {formErrors ? <p>{formErrors}</p> : null}
            </span>*/}
            <div className="Login-link">
              {/*<a
                href="https://flask-workout.onrender.com/reset_password"
                target="_blank"
              >
                Forgot password?
              </a>*/}
              <a href="#" onClick={handleOpenModal}>
                Forgot password?
              </a>
            </div>
            {isModalOpen && (
              <div className="Login-modal">
                <div className="Login-modal-content">
                  <span className="Login-close" onClick={handleCloseModal}>
                    &times;
                  </span>
                  <Label htmlFor="email">Type your Email</Label>
                  <Input
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  ></Input>
                  <a href="#" onClick={() => navigateToOtp()}>
                    Password Recovery
                  </a>
                </div>
              </div>
            )}
            <Button type="submit" className="btn btn-lg btn-block" color="info">
              Login
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
