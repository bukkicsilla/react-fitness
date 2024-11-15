import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import UserContext from "./UserContext";
import Spinner from "./common/Spinner";
import FitnessApi from "./common/api";
import "./MyVideos.css";
//import "bootstrap/dist/css/bootstrap.min.css";

function MyVideos() {
  const history = useHistory();
  const [muscleGroups, setMuscleGroups] = useState({});
  const [ids, setIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let { currentUser } = useContext(UserContext);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await FitnessApi.getVideos(currentUser.id);
        setMuscleGroups(response.muscle_groups);
        setIds(response.ids);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }
    fetchVideos();
  }, []);

  async function deleteUserVideo(id) {
    try {
      const res = await FitnessApi.deleteUserVideo(id);
      console.log("delete uservideo", res);
      history.replace("/");
      history.push("/myvideos");
    } catch (e) {
      console.log("Error", e);
    }
  }

  if (isLoading) return <Spinner />;

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
                            <button
                              className="delete-video"
                              onClick={() => deleteUserVideo(video.id)}
                            >
                              X
                            </button>
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
