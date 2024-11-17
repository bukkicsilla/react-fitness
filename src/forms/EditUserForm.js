import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Form, Label, Input, Button } from "reactstrap";
import UserContext from "../UserContext";
import FitnessApi from "../common/api";
import "./EditUserForm.css";
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

const EditUserForm = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const history = useHistory();
  const INITIAL_STATE = {
    username: currentUser.username,
    email: currentUser.email,
    first_name: currentUser.first_name,
    last_name: currentUser.last_name,
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [message, setMessage] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  /** Update form fields */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
    setFormErrors([]);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    let profileData = {
      username: formData.username,
      email: formData.email,
      first_name: formData.first_name,
      last_name: formData.last_name,
    };

    //let username = formData.username;
    let updatedUser;

    try {
      updatedUser = await FitnessApi.updateProfile(currentUser.id, profileData);
      setMessage("Saved successfully!");
      history.push("/profile");
    } catch (errors) {
      setFormErrors(errors);
      return;
    }

    //setFormData((f) => ({ ...f, password: "" }));
    setFormErrors([]);

    // trigger reloading of user information throughout the site
    setCurrentUser(updatedUser);
  };

  return (
    <div className="EditUserForm col-md-5 offset-md-4 col-lg-4 offset-lg-4">
      <Card>
        <CardBody>
          <h1>Edit User Profile {currentUser.id}</h1>
          <Form className="EditUserForm-form" onSubmit={handleSubmit}>
            <Label htmlFor="username" className="EditUserForm-Label">
              Username
            </Label>
            <Input
              className="EditUserForm-Input"
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            ></Input>
            {/*<Label htmlFor="password" className="SignUp-Label">
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
            ></Input>*/}
            <Label htmlFor="email" className="EditUserForm-Label">
              Email
            </Label>
            <Input
              className="EditUserForm-Input"
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            ></Input>
            <Label htmlFor="first_name" className="EditUserForm-Label">
              First Name
            </Label>
            <Input
              className="EditUserForm-Input"
              id="first_name"
              name="first_name"
              type="text"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              required
            ></Input>
            <Label htmlFor="last_name" className="EditUserForm-Label">
              Last Name
            </Label>
            <Input
              className="EditUserForm-Input"
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
            ></Input>
            <span className="EditItem-formErrors">
              {formErrors ? <p>{formErrors}</p> : null}
            </span>
            <Button type="submit" className="btn btn-lg btn-block" color="info">
              Edit Profile
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default EditUserForm;
