import React from "react";
import "./About.css";
const About = () => {
  return (
    <div className="About">
      <h1>Author: Csilla Bukki</h1>
      <p>
        This is a full-stack web application that uses React, NodeJS, Flask and
        PostgreSQL.
      </p>
      <p>
        On this page, I give you a brief tutorial on how to use the website.
      </p>
      <div>
        <p>You can find the Flask website here: </p>
        <a href="https://flask-workout.onrender.com/" target="_blank">
          Workout Flask Website
        </a>
      </div>
    </div>
  );
};
export default About;
