//import logo from "./logo.svg";
import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";
import Videos from "./Videos";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/myvideos" element={<h1> My Videos ... </h1>} />
          <Route path="/playlists" element={<h1> Playlists ... </h1>} />
          <Route path="/profile" element={<h1> Profile ... </h1>} />
          <Route path="/videos/:name" element={<Videos />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
