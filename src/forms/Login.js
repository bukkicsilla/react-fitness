import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Form, Label, Input, Button } from "reactstrap";
import "./Login.css";
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
  const history = useHistory();
  const INITIAL_STATE = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [formErrors, setFormErrors] = useState([]);

  /*console.debug(
    "Login",
    "login=",
    typeof login,
    "formData=",
    formData,
    "formErrors=",
    formErrors
  );*/

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
      let result = await login(formData);
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
              type="text"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            ></Input>
            <span className="NewItemForm-message">
              {formErrors ? <p>{formErrors}</p> : null}
            </span>
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
