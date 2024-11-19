import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import FitnessApi from "../common/api";
import { Card, CardBody, Form, Label, Input, Button } from "reactstrap";
import "./PlaylistForm.css";

const PlaylistForm = ({ addVideoToPlaylist }) => {
  const history = useHistory();
  const { video_id } = useParams();
  const INITIAL_STATE = {
    name: "",
  };

  // State to manage form fields
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [playlistNames, setPlaylistNames] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  useEffect(() => {
    async function fetchPlaylistNames() {
      try {
        const response = await FitnessApi.getPlaylistNames();
        setPlaylistNames(["Choose a name", ...response.sortedNames]);
      } catch (error) {
        console.error("Error fetching playlist names:", error);
      }
    }
    fetchPlaylistNames();
  }, []);

  /** Update form fields */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const playlist_name = formData.name || playlistName;
      const res = await addVideoToPlaylist(playlist_name, video_id);
      if (res.msg === "Video already added to the playlist") {
        history.push("/myvideos");
      } else {
        history.push("/playlists");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="PlaylistForm col-md-5 offset-md-4 col-lg-4 offset-lg-4">
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="selectname">Playlist Name:</Label>
            <select
              onChange={(e) => setPlaylistName(e.target.value)}
              className="select-dropdown px-4 py-2"
              id="selectname"
            >
              {playlistNames.map((name, index) => (
                <option key={index} value={name} className="option-item">
                  {name}
                </option>
              ))}
            </select>
            <Label htmlFor="pickname">Or pick a new name:</Label>
            <Input
              type="text"
              name="name"
              id="pickname"
              value={formData.name}
              onChange={handleChange}
            />
            <Button color="primary">Add to Playlist</Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default PlaylistForm;
