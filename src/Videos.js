import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserContext from "./UserContext";
import { useEffect, useState } from "react";
import Auth from "./Auth";
import "./Videos.css";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const Videos = () => {
  const { name } = useParams();
  let { currentUser } = useContext(UserContext);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    async function getVideos() {
      try {
        const res = await axios.get(`${BASE_URL}/videos/${name}`);
        console.log("video data", res.data);
        setVideos(res.data);
      } catch (e) {
        console.log("Error", e);
      }
    }
    getVideos();
  }, [name]);

  function showVideos() {
    return (
      <div className="container-md">
        <h2 className="text-center mt-4">Exercise: {name}</h2>

        <section className="videos">
          {videos.map((video) => (
            <div key={video.videoid} className="video-wrapper">
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
                href={`auth/videos/add/${name}/${video.videoid}`}
                className="add-video"
              >
                +
              </a>
            </div>
          ))}
        </section>
      </div>
    );
  }

  return <div>{currentUser ? showVideos() : <Auth />}</div>;
};

export default Videos;
