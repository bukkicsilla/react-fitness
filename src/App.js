//import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import LocalStorage from "./common/LocalStorage";
import jwt from "jsonwebtoken";
//import Home from "./Home";
import Home2 from "./Home2";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Videos from "./Videos";
import "bootstrap/dist/css/bootstrap.min.css";
import FitnessApi from "./common/api";
import UserContext from "./UserContext";
import PrivateRoute from "./PrivateRoute";
import Login from "./forms/Login";
import SignUp from "./forms/SignUp";
import Profile from "./Profile";
import EditUserForm from "./forms/EditUserForm";
import About from "./About";
import MyVideos from "./MyVideos";
import MyVideos2 from "./MyVideos2";
import Playlists from "./Playlists";
import Playlists2 from "./Playlists2";
import PlaylistForm from "./forms/PlaylistForm";
import OTPInput from "./forms/OTPInput";
import Reset from "./forms/Reset";
import "./App.css";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "fitness-token";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  //const [userId, setUserId] = useState(0);
  const [token, setToken] = LocalStorage(TOKEN_STORAGE_ID);
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();

  function NavigateComponents() {
    if (page === "login") return <Login login={login} />;
    if (page === "otp") return <OTPInput />;
    if (page === "reset") return <Reset loginreset={loginAfterPasswordReset} />;

    return <Login login={login} />;
  }

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        console.log("App token", token);
        try {
          let { username } = jwt.decode(token);
          // put the token on the Api class so it can use it to call the API.
          FitnessApi.token = token;
          let currentUser = await FitnessApi.getCurrentUser(username);
          console.log("Current User: ", currentUser);
          setCurrentUser(currentUser);
          //setUserId(userid);
        } catch (err) {
          console.error("App getCurrentUser: problem loading", err);
          setCurrentUser(null);
          //setUserId(0);
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
      let { username } = jwt.decode(token);
      FitnessApi.token = token;
      let currentUser = await FitnessApi.getCurrentUser(username);
      setCurrentUser(currentUser);
      //setCurrentUser(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  async function loginAfterPasswordReset(token) {
    try {
      let { username } = jwt.decode(token);
      FitnessApi.token = token;
      let currentUser = await FitnessApi.getCurrentUser(username);
      setCurrentUser(currentUser);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  /** Deletes a user and all their data */
  async function deleteProfile() {
    try {
      //await FitnessApi.deleteProfile(currentUser.username);
      await FitnessApi.deleteUser(currentUser.id);
      logout();
      return { success: true };
    } catch (errors) {
      console.error("delete failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide logout. */
  const logout = () => {
    setCurrentUser(null);
    //setUserId(0);
    setToken("token");
  };

  const addVideoToPlaylist = async (playlistName, videoId) => {
    try {
      const res = await FitnessApi.addVideoToPlaylist(playlistName, videoId);
      return res;
    } catch (errors) {
      console.error("add video failed", errors);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider
          value={{
            currentUser,
            setCurrentUser,
            logout,
            page,
            setPage,
            email,
            setEmail,
            otp,
            setOTP,
          }}
        >
          <NavBar logout={logout} />
          {/*<h1 style={{ color: "#e9316d" }}> Color red Pink</h1>*/}
          <div className="App-main-content">
            <Switch>
              <Route exact path="/">
                <Home2 />
              </Route>
              <PrivateRoute path="/myvideos">
                <MyVideos2 />
              </PrivateRoute>
              <Route path="/playlists">
                <Playlists2 />
              </Route>
              <Route exact path="/login">
                {/*<Login login={login} />*/}
                <NavigateComponents />
              </Route>
              <Route exact path="/signup">
                <SignUp signup={signup} />
              </Route>
              <PrivateRoute path="/profile">
                <Profile deleteProfile={deleteProfile} />
              </PrivateRoute>
              <Route exact path="/editprofile">
                <EditUserForm />
              </Route>
              <Route path="/videos/:name">
                <Videos />
              </Route>
              <Route path="/addvideotoplaylist/:video_id">
                <PlaylistForm addVideoToPlaylist={addVideoToPlaylist} />
              </Route>
              <Route path="/about">
                <About />
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
