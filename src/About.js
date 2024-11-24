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
            On the left side of the screen, you will see a list of muscle groups
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
            to log in. If you are not already logged in, a prompt will guide you
            to sign in or create an account.
          </li>
        </ol>
      </section>
      <section>
        <h2> Video Display</h2>
        <ol>
          <li>
            <strong>Browse Exercise Videos:</strong>
            Once you select an exercise, you will see up to 25 related YouTube
            videos. Scroll through the list to find a video you want to watch.
          </li>
          <li>
            <strong>Play Video:</strong>
            Click on a video to play it directly on the page. If you want to
            view it in full screen, double-click the video. To exit full screen
            mode, press the Esc key on your keyboard.
          </li>
          <li>
            <strong>Add Videos to My Videos:</strong>
            To save a video for quick access later, click{" "}
            <span class="About-plus">the green plus sign (+)</span> located in
            the top-right corner of the video. This adds the video to your
            personalized "My Videos" collection.
          </li>
        </ol>
      </section>
      <section>
        <h2>My Videos</h2>
        <ol>
          <li>
            <strong>Organize Your Videos by Category</strong>
            On the top-left side of the page, you will find a dropdown menu
            where you can choose how to group your saved videos. The available
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
            category. Scroll through the list from side to side to find and play
            a video.
          </li>
          <li>
            <strong>Add a Video to a Playlist</strong>
            To save a video to a playlist, click{" "}
            <span class="About-plus">the green plus sign (+)</span> located in
            the top-left corner of the video.
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
      <section>
        <h2>Playlists</h2>
        <ol>
          <li>
            <strong>Browse Playlists</strong>
            On the Playlists page, your videos are organized by the playlist
            names you have created. Each playlist groups videos you have added
            under a specific theme or goal.
          </li>
          <li>
            <strong>Scroll Through Playlists</strong>
            Use the horizontal scroll feature to navigate through your
            playlists. Simply swipe or drag from side to side to browse the
            videos within a playlist. You can also play any video directly, just
            as you would on the <span class="highlight">"My Videos"</span> page.
          </li>
          <li>
            <strong>Add Videos to Playlists</strong>
            When adding a video from the{" "}
            <span class="highlight">"My Videos"</span> page, you’ll be directed
            to a form where you can:
            <ol>
              <li>
                Choose from your existing playlists by selecting a name from the
                dropdown menu.
              </li>
              <li>
                Or, type a new name to create a brand-new playlist and add the
                video to it.
              </li>
            </ol>
          </li>
        </ol>
      </section>
      <section>
        <h2>User Profile</h2>
        <ol>
          <li>
            <strong>View Your Profile</strong>
            At the top of the page, you will see a personalized greeting with
            your name, along with information about yourself that you have added
            to your profile.
          </li>
          <li>
            <strong>Edit or Delete Your Profile</strong>
            To update your details, click the
            <span class="highlight">Edit Profile</span> button and make your
            changes. If you wish to delete your profile, use the{" "}
            <span class="highlight">Delete Profile</span> button. Be cautious,
            as deleting your profile will remove all your data.
          </li>
          <li>
            <strong>Explore Top-Rated Videos</strong>
            The page displays four randomly chosen videos from the top-rated
            collection. These videos are intended to inspire you with new
            workouts or ideas.
          </li>
          <li>
            <strong>Add Videos to Playlists</strong>
            To save any of the displayed videos, click{" "}
            <span className="About-plus">the green plus sign (+) </span>
            located in the top-right corner of the video. You can then choose an
            existing playlist or create a new one.
          </li>
        </ol>
      </section>
      <section>
        <h2>Delete a video</h2>
        <p>
          To delete a video from either your
          <span class="highlight">"My Videos"</span> or
          <span class="highlight">"Playlists"</span> page, simply click{" "}
          <span className="About-X"> the red delete icon (x) </span> located in
          the top-right corner of the video, and the video will be removed from
          the respective collection.
        </p>
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
