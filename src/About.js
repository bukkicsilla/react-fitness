import React from "react";
import "./About.css";
const About = () => {
  return (
    <div className="About">
      {/*<h1>Author: Csilla Bukki</h1>*/}

      <h1> ONBOARD GUIDE</h1>
      <section>
        <h2> Start Page</h2>
        <ol>
          <li>
            <strong>Explore Muscle Groups:</strong>
            On the left side of the screen, you’ll see a list of muscle groups
            (Abdominals, Adbuctors ...). Browse through the list to find the
            muscle group you want to focus on.
          </li>
          <li>
            <strong>View Exercises:</strong>
            When you click on a muscle group, a list of related exercises will
            appear on the right side of the screen. Each exercise includes a
            link to show YouTube videos.
          </li>
          <li>
            <strong>Log In to Access Details:</strong>
            To click on an exercise link and view the YouTube videos, you need
            to log in. If you’re not already logged in, a prompt will guide you
            to sign in or create an account.
          </li>
        </ol>
      </section>
      <section>
        <h2> Video Display</h2>
        <ol>
          <li>
            <strong>Browse Exercise Videos:</strong>
            Once you select an exercise, you’ll see up to 25 related YouTube
            videos. Scroll through the list to find a video you want to watch.
          </li>
          <li>
            <strong>Play Video:</strong>
            Click on a video thumbnail to play it directly on the page. If you
            want to view it in full screen, double-click the video. To exit full
            screen mode, press the Esc key on your keyboard.
          </li>
          <li>
            <strong>Add Videos to "My Videos":</strong>
            To save a video for quick access later, click the green plus sign
            (+) located in the top-right corner of the video. This adds the
            video to your personalized "My Videos" collection.
          </li>
        </ol>
      </section>
      <section>
        <h2>My Videos</h2>
        <ol>
          <li>
            <strong>Organize Your Videos by Category</strong>
            On the top-left side of the page, you’ll find a dropdown menu where
            you can choose how to group your saved videos. The available
            categories are:
            <ul>
              <li class="About-highlight">Muscle Group</li>
              <li class="About-highlight">Equipment</li>
              <li class="About-highlight">Exercise Type</li>
              <li class="About-highlight">Difficulty Level</li>
            </ul>
            Select a category to filter and display your videos accordingly.
          </li>
          <li>
            <strong>Browse and View Videos</strong>
            Once grouped, your videos will be displayed based on the selected
            category. Scroll through the list to find and play a video, just as
            you would on the Video Page.
          </li>
          <li>
            <strong>Rate a Video</strong>
            To rate a video, click on the star icon located beneath it. A popup
            modal will appear where you can select a rating from{" "}
            <span class="About-rating">1 to 10</span>. After choosing your
            desired rating, confirm to save your feedback. This helps you keep
            track of the videos you enjoy the most or find most effective.
          </li>
        </ol>
      </section>
      <div>
        <div id="About-workout">
          You can find the Flask website here:
          <a href="https://flask-workout.onrender.com/" target="_blank">
            <i
              style={{
                color: "gold",
                fontSize: "1.5rem",
                marginRight: "1rem",
              }}
              className="fa fa-flask"
            ></i>
          </a>
        </div>
      </div>
    </div>
  );
};
export default About;
