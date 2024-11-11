//import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import LocalStorage from "./common/LocalStorage";
import jwt from "jsonwebtoken";
import Home from "./Home";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Videos from "./Videos";
import "bootstrap/dist/css/bootstrap.min.css";
import FitnessApi from "./common/api";
import UserContext from "./UserContext";
import PrivateRoute from "./PrivateRoute";
import Login from "./forms/Login";
import SignUp from "./forms/SignUp";
import "./App.css";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "fitness-token";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userId, setUserId] = useState(0);
  const [token, setToken] = LocalStorage(TOKEN_STORAGE_ID);
  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        console.log("App token", token);
        try {
          let { username, userid } = jwt.decode(token);
          //console.log("user username", username);
          //console.log("user id", userId);
          // put the token on the Api class so it can use it to call the API.
          FitnessApi.token = token;
          let currentUser = await FitnessApi.getCurrentUser(username);
          console.log("Current User: ", currentUser);
          setCurrentUser(currentUser);
          setUserId(userid);
        } catch (err) {
          console.error("App getCurrentUser: problem loading", err);
          setCurrentUser(null);
          setUserId(0);
        }
      }
    }
    getCurrentUser();
  }, [token]);

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   * */
  async function signup(signupData) {
    try {
      let token = await FitnessApi.signup(signupData);
      setToken(token);
      FitnessApi.token = token;
      setCurrentUser(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login. */
  async function login(loginData) {
    try {
      let token = await FitnessApi.login(loginData);
      setToken(token);
      let { username, userId } = jwt.decode(token);
      //console.log("user username", username);
      //console.log("user id", userId);
      FitnessApi.token = token;
      let currentUser = await FitnessApi.getCurrentUser(username);
      //console.log("Current User: ", currentUser);
      //setCurrentUser(currentUser);
      setCurrentUser(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  /** Deletes a user and all their data */
  /*async function deleteUser() {
    try {
      await JoblyApi.deleteProfile(currentUser.username);
      logout();
      return { success: true };
    } catch (errors) {
      console.error("delete failed", errors);
      return { success: false, errors };
    }
  }*/

  /** Handles site-wide logout. */
  const logout = () => {
    setCurrentUser(null);
    setUserId(0);
    setToken("token");
  };

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider
          value={{ currentUser, setCurrentUser, userId, setUserId }}
        >
          <NavBar logout={logout} />
          {/*<h1 style={{ color: "#e9316d" }}> Color red Pink</h1>*/}
          <div className="App-main-content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <PrivateRoute path="/myvideos">
                <h1> My Videos ... </h1>
              </PrivateRoute>
              <Route path="/playlists">
                <h1> Playlists ... </h1>
              </Route>
              <Route exact path="/login">
                <Login login={login} />
              </Route>
              <Route exact path="/signup">
                <SignUp signup={signup} />
              </Route>
              <Route path="/profile">
                <h1> Profile ... </h1>
              </Route>
              <Route path="/videos/:name">
                <Videos />
              </Route>
              <Route path="*">
                <h1>404 Not Found</h1>
              </Route>
            </Switch>
          </div>
          <Footer logout={logout} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
