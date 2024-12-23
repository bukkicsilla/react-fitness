import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import Spinner from "./common/Spinner";
import FitnessApi from "./common/api";
import RatingStars from "./forms/RatingStars";
import "./MyVideos.css";

function MyVideos2() {
  const [muscleGroups, setMuscleGroups] = useState({});
  const [ids, setIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState("muscle");
  let { currentUser } = useContext(UserContext);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await FitnessApi.getVideos(currentUser.id, mode);
        setMuscleGroups(response.muscle_groups);
        setIds(response.ids);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }
    fetchVideos();
  }, [mode, currentUser.id]);

  // Modified delete function to update state instead of rerendering the page
  /*async function deleteUserVideo(id) {
    try {
      // Delete video from the backend
      await FitnessApi.deleteUserVideo(id);

      // Update state to remove the video from the UI without reloading
      setIds((prevIds) => prevIds.filter((videoId) => videoId !== id));
    } catch (e) {
      console.log("Error", e);
    }
  }*/

  async function deleteUserVideo(id) {
    try {
      // Delete the video from the backend
      await FitnessApi.deleteUserVideo(id);

      // Update state to remove the video from the UI
      setIds((prevIds) => prevIds.filter((videoId) => videoId !== id));

      setMuscleGroups((prevMuscleGroups) => {
        const updatedMuscleGroups = {};

        for (const [muscle, exercises] of Object.entries(prevMuscleGroups)) {
          const updatedExercises = exercises.map((exercise) => ({
            ...exercise,
            videos: exercise.videos.filter((video) => video.id !== id),
          }));

          // Keep only exercises with remaining videos
          const nonEmptyExercises = updatedExercises.filter(
            (exercise) => exercise.videos.length > 0
          );

          if (nonEmptyExercises.length > 0) {
            updatedMuscleGroups[muscle] = nonEmptyExercises;
          }
        }

        return updatedMuscleGroups;
      });
    } catch (e) {
      console.log("Error", e);
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="container-fluid mt-4">
      <select
        onChange={(e) => setMode(e.target.value)}
        className="select-dropdown px-4 py-2"
      >
        <option value="muscle" className="option-item">
          Muscle
        </option>
        <option value="equipment" className="option-item">
          Equipment
        </option>
        <option value="exercise_type" className="option-item">
          Type
        </option>
        <option value="difficulty" className="option-item">
          Difficulty
        </option>
      </select>
      {Object.keys(muscleGroups).length === 0 ? (
        <h3 className="text-center">You have no videos yet.</h3>
      ) : (
        Object.entries(muscleGroups).map(([muscle, exercises]) => (
          <div key={muscle}>
            <h3>{muscle}</h3>
            <div className="mt-4">
              <div className="row">
                <div className="col">
                  <div
                    className="d-flex overflow-auto flex-video-carousel"
                    id="video-carousel"
                  >
                    {exercises.map((exercise) =>
                      exercise.videos.map((video) =>
                        ids.includes(video.id) ? (
                          <div
                            key={video.id}
                            className="me-2 MyVideos-video-wrapper"
                          >
                            <iframe
                              width="320"
                              height="180"
                              src={`https://www.youtube.com/embed/${video.videoid}`}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                            <button
                              className="MyVideos-delete-video"
                              onClick={() => deleteUserVideo(video.id)}
                            >
                              X
                            </button>
                            <RatingStars video={video} />
                            <Link
                              to={`/addvideotoplaylist/${video.id}`}
                              className="MyVideos-add-playlist"
                            >
                              +
                            </Link>
                          </div>
                        ) : null
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyVideos2;
