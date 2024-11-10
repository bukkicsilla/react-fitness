import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Videos.css";

const BASE_URL = "http://localhost:3001";
const Videos = () => {
  const { name } = useParams();
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

  return (
    <div class="container-md">
      <h2 class="text-center mt-4">Exercise: {name}</h2>

      <section class="videos">
        {videos.map((video) => (
          <div class="video-wrapper">
            <iframe
              width="320"
              height="180"
              src={`https://www.youtube.com/embed/${video.videoid}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <a
              href={`auth/videos/add/${name}/${video.videoid}`}
              class="add-video"
            >
              +
            </a>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Videos;
