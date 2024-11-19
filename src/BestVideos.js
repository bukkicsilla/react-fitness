import React, { useEffect, useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "./UserContext";
import FitnessApi from "./common/api";

const BestVideos = () => {
  let { currentUser } = useContext(UserContext);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await FitnessApi.getBestVideos();
        console.log("response", response.randomVideos);
        setVideos(response.randomVideos);
        //setIsLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }
    fetchVideos();
  }, []);

  return (
    <section className="Profile-bestvideos">
      {videos.map((video) => (
        <div key={video.videoid} className="video-wrapper">
          <iframe
            width="400"
            height="225"
            src={`https://www.youtube.com/embed/${video.videoid}`}
            title="YouTube video player"
            frameborder="0"
            allowfullscreen
          ></iframe>
          <Link to={`/addvideotoplaylist/${video.id}`} className="add-video">
            +
          </Link>
        </div>
      ))}
    </section>
  );
};
export default BestVideos;
