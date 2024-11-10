import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Form, Label, Input, Button } from "reactstrap";
import "./SignUp.css";
/** User signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to home route
 *
 * Routes -> Signup
 * Routed as /signup
 */

const SignUpForm = ({ signup }) => {
  const history = useHistory();
  const INITIAL_STATE = {
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "Signup",
    "signup=",
    typeof signup,
    "formData=",
    formData,
    "formErrors=",
    formErrors
  );

  /** Update form fields */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      let result = await signup(formData);
      // makes a POST request to Api.js and adds corresponding data to matching category in db.json
      if (result.success) {
        // imperatively redirect to correct page and refresh to see new data
        history.push("/");
      } else {
        setFormErrors(result.errors);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="SignUp col-md-5 offset-md-4 col-lg-4 offset-lg-4">
      <Card>
        <CardBody>
          <h1>Sign Up</h1>
          <Form className="SignUp-form" onSubmit={handleSubmit}>
            <Label htmlFor="username" className="SignUp-Label">
              Username
            </Label>
            <Input
              className="SignUp-Input"
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            ></Input>
            <Label htmlFor="password" className="SignUp-Label">
              Password
            </Label>
            <Input
              className="SignUp-Input"
              id="password"
              name="password"
              type="text"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            ></Input>
            <Label htmlFor="email" className="SignUp-Label">
              Email
            </Label>
            <Input
              className="SignUp-Input"
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            ></Input>
            <Label htmlFor="first_name" className="SignUp-Label">
              First Name
            </Label>
            <Input
              className="SignUp-Input"
              id="first_name"
              name="first_name"
              type="text"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              required
            ></Input>
            <Label htmlFor="last_name" className="SignUp-Label">
              Last Name
            </Label>
            <Input
              className="SignUp-Input"
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
            ></Input>
            <span className="NewItem-formErrors">
              {formErrors ? <p>{formErrors}</p> : null}
            </span>
            <Button type="submit" className="btn btn-lg btn-block" color="info">
              Sign Up
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignUpForm;
