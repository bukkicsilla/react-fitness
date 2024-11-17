import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import FitnessApi from "../common/api";
import "./PlaylistForm.css";

const RatingForm = ({ video }) => {
  const history = useHistory();
  const initialState = {
    rating: 5,
  };
  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //const { rating } = formData;
      const rating = parseInt(formData.rating);
      await FitnessApi.rateVideo(video.id, rating);
      history.replace("/");
      history.push("/myvideos");
      setFormData(initialState);
    } catch (e) {
      console.log("Error", e);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
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
        onChange={handleChange}
        required
      />
      <button className="btn btn-success" id="btn-rating" type="submit">
        <i
          style={{ color: "azure", fontSize: "1.5rem" }}
          className="fa fa-star-o"
        ></i>
      </button>
    </form>
  );
};

export default RatingForm;
