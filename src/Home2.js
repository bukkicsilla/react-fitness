import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import Groups from "./Groups";
//import FindExercisesForm from "./forms/FindExercisesForm";
import Start from "./Start";
import axios from "axios";
import "./Home.css";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

const Home2 = ({ logout }) => {
  const [exercises, setExercises] = useState([]);
  let { currentUser, userId } = useContext(UserContext);

  // Function to fetch exercises for a given muscle group
  const fetchExercises = async (muscle) => {
    try {
      const res = await axios.get(`${BASE_URL}/exercises/${muscle}`);
      setExercises(res.data);
    } catch (e) {
      console.log("Error fetching exercises:", e);
    }
  };

  // Click handler for muscle group list
  const handleMuscleClick = (muscle) => {
    fetchExercises(muscle);
  };

  return (
    <main>
      <Groups>
        <p>Search among the following exercise groups:</p>
        <ul className="choices">
          {[
            "Abdominals",
            "Abductors",
            "Adductors",
            "Biceps",
            "Calves",
            "Chest",
            "Forearms",
            "Glutes",
            "Hamstrings",
            "Lats",
            "Lower Back",
            "Middle Back",
            "Neck",
            "Quadriceps",
            "Traps",
            "Triceps",
          ].map((muscle) => (
            <li
              key={muscle}
              onClick={() => handleMuscleClick(muscle.slice(0, 4))}
            >
              {muscle}
            </li>
          ))}
        </ul>
      </Groups>
      <section className="search-muscle-group">
        {/*<FindExercisesForm findExercisesByMuscle={setExercises} />*/}
        <Start logout={logout} />
        <ul id="exercise-list" className="pencilsnow">
          {exercises.map((exercise) => (
            <li key={exercise.name}>
              <Link to={`/videos/${exercise.name}`}>{exercise.name}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Home2;
