import React, { useEffect, useState, useContext } from "react";
import UserContext from "./UserContext";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

function MyVideos() {
  const [muscleGroups, setMuscleGroups] = useState({});
  const [ids, setIds] = useState([]);
  let { currentUser } = useContext(UserContext);

  useEffect(() => {
    async function fetchVideos() {
      try {
        //const response = await axios.get("/auth/myVideosLoaded");
        const response = await axios.get(
          `${BASE_URL}/users/${currentUser.id}/videos`
        );
        setMuscleGroups(response.data.muscle_groups);
        setIds(response.data.ids);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }

    fetchVideos();
  }, []);

  return (
    <div className="container-fluid mt-4">
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
                          <div key={video.id} className="me-2 video-wrapper">
                            <iframe
                              width="320"
                              height="180"
                              src={`https://www.youtube.com/embed/${video.videoid}`}
                              title="YouTube video player"
                              frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                            <a
                              href={`/auth/videos/delete/${video.id}`}
                              className="delete-video"
                            >
                              X
                            </a>
                            <form action={`/rating/${video.id}`} method="POST">
                              <label htmlFor={video.id}>
                                <i
                                  style={{ color: "gold", fontSize: "1.5rem" }}
                                  className="fa fa-star"
                                ></i>
                                {video.rating}
                              </label>
                              <input
                                type="number"
                                name="rating"
                                min="1"
                                max="10"
                                step="1"
                                id={video.id}
                                className="rating"
                                required
                              />
                              <button
                                id="btn-rating"
                                className="btn btn-success"
                                type="submit"
                              >
                                <i
                                  style={{ color: "azure", fontSize: "1.5rem" }}
                                  className="fa fa-star-o"
                                ></i>
                              </button>
                            </form>
                            <a
                              href={`/auth/playlists/add/${video.id}`}
                              className="add-playlist"
                            >
                              +
                            </a>
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

export default MyVideos;
