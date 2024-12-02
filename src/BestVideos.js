import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FitnessApi from "./common/api";

const BestVideos = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await FitnessApi.getBestVideos();
        setVideos(response.randomVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }
    fetchVideos();
  }, []);

  return (
    <section className="Profile-bestvideos">
      {videos.map((video) => (
        <div key={video.videoid} className="Profile-video-wrapper">
          <iframe
            width="400"
            height="225"
            src={`https://www.youtube.com/embed/${video.videoid}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <Link
            to={`/addvideotoplaylist/${video.id}`}
            className="Profile-add-video"
          >
            +
          </Link>
        </div>
      ))}
    </section>
  );
};
export default BestVideos;
