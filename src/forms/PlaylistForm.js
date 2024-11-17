import React, { useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Card, CardBody, Form, Label, Input, Button } from "reactstrap";
import UserContext from "../UserContext";
import FitnessApi from "../common/api";
import "./PlaylistForm.css";

const PlaylistForm = ({ addVideoToPlaylist }) => {
  const history = useHistory();
  const { video_id } = useParams();
  const INITIAL_STATE = {
    name: "",
  };

  // State to manage form fields
  const [formData, setFormData] = useState(INITIAL_STATE);

  /** Update form fields */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
    //setFormErrors([]);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      //console.log("formData", formData);
      const playlist_name = formData.name;
      //console.log("playlist_name", playlist_name);
      const res = await addVideoToPlaylist(playlist_name, video_id);
      console.log("result", res);
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
    <div>
      <h1> The video ID is: {video_id}</h1>
      <div className="Playlist col-md-5 offset-md-4 col-lg-4 offset-lg-4">
        <Card>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <Label htmlFor="name">Playlist Name:</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
              />
              <Button color="primary">Add to Playlist</Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default PlaylistForm;
