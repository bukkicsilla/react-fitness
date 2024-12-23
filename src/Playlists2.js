import React, { useEffect, useState, useContext } from "react";
import UserContext from "./UserContext";
import Spinner from "./common/Spinner";
import FitnessApi from "./common/api";
import "./Playlists.css";

function Playlists2() {
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await FitnessApi.getPlaylists(currentUser.id);
        setPlaylists(response.playlists);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, [currentUser.id]);

  // Modified delete function to update state instead of rerendering the page
  /*async function deletePlaylistVideo(playlistName, videoId) {
    try {
      // Delete the video from the playlist on the backend
      console.log("playlist", playlists[0].videos.length);
      await FitnessApi.deletePlaylistVideo(playlistName, videoId);

      // Update the playlists state to remove the video locally
      setPlaylists((prevPlaylists) =>
        prevPlaylists.map((playlist) =>
          playlist.name === playlistName
            ? {
                ...playlist,
                videos: playlist.videos.filter((video) => video.id !== videoId),
              }
            : playlist
        )
      );
    } catch (e) {
      console.log("Error", e);
    }
  }*/

  async function deletePlaylistVideo(playlistName, videoId) {
    try {
      // Delete the video from the playlist on the backend
      await FitnessApi.deletePlaylistVideo(playlistName, videoId);

      // Update the playlists state to remove the video locally and filter out empty playlists
      setPlaylists(
        (prevPlaylists) =>
          prevPlaylists
            .map((playlist) =>
              playlist.name === playlistName
                ? {
                    ...playlist,
                    videos: playlist.videos.filter(
                      (video) => video.id !== videoId
                    ),
                  }
                : playlist
            )
            .filter((playlist) => playlist.videos.length > 0) // Filter out empty playlists
      );
    } catch (e) {
      console.log("Error", e);
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="container-fluid mt-4">
      {playlists.length === 0 ? (
        <h3 className="text-center">You have no playlists yet.</h3>
      ) : (
        playlists.map((playlist) => (
          <div key={playlist.id}>
            <h3>{playlist.name}</h3>
            <div className="mt-4">
              <div className="row">
                <div className="col">
                  <div className="d-flex overflow-auto flex-video-carousel">
                    {playlist.videos.map((video) => (
                      <div
                        key={video.id}
                        className="me-2 Playlists-video-wrapper"
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
                          className="Playlists-delete-video"
                          onClick={() =>
                            deletePlaylistVideo(playlist.name, video.id)
                          }
                        >
                          X
                        </button>
                      </div>
                    ))}
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

export default Playlists2;
