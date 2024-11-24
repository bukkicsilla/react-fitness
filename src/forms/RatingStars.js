import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import FitnessApi from "../common/api";
import "./RatingStars.css";

const RatingStars = ({ video }) => {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleStarClick = async (index) => {
    await FitnessApi.rateVideo(video.id, index + 1);
    history.replace("/");
    history.push("/myvideos");
  };

  const handleStarHover = (index) => {
    setHoverIndex(index); // Set the hover index to the star being hovered
  };

  const handleStarLeave = () => {
    setHoverIndex(null); // Reset the hover index when the mouse leaves
  };

  return (
    <div>
      {/* Display Rating */}
      <div onClick={handleOpenModal} style={{ cursor: "pointer" }}>
        <i
          style={{ color: "gold", fontSize: "1.5rem" }}
          className="fa fa-star"
        ></i>
        {video.rating}
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <div className="rating-stars">
              <div>
                {/* Stars (filled and empty based on hover or rating) */}
                {Array.from({ length: 10 }, (_, index) => (
                  <i
                    key={index}
                    style={{
                      color: "gold",
                      fontSize: "1.5rem",
                      cursor: "pointer",
                    }}
                    className={
                      index <=
                      (hoverIndex !== null ? hoverIndex : video.rating - 1)
                        ? "fa fa-star"
                        : "fa fa-star-o"
                    }
                    onClick={() => handleStarClick(index)} // Update rating on click
                    onMouseEnter={() => handleStarHover(index)} // Highlight on hover
                    onMouseLeave={handleStarLeave} // Reset hover on leave
                  ></i>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingStars;
