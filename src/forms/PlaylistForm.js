import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
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
      const playlist_name = formData.name;
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
  );
};

export default PlaylistForm;
