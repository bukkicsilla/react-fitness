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
import "./App.css";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "fitness-token";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = LocalStorage(TOKEN_STORAGE_ID);
  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        console.log("App token", token);
        try {
          let { username } = jwt.decode(token);
          console.log("App username", username);
          // put the token on the Api class so it can use it to call the API.
          FitnessApi.token = token;
          let currentUser = await FitnessApi.getCurrentUser(username);
          console.log("Current User: ", currentUser);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error("App getCurrentUser: problem loading", err);
          setCurrentUser(null);
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
    setToken("token");
  };

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <NavBar logout={logout} />
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
          <Footer logout={logout} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
