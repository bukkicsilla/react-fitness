import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Groups from "./Groups";
import "./Home.css";
import FindExercisesForm from "./forms/FindExercisesForm";
import UserContext from "./UserContext";

const Home = () => {
  const [exercises, setExercises] = useState([]);
  let { currentUser, userId } = useContext(UserContext);
  /*useEffect(() => {
    async function getAllExercises() {
      try {
        const res = await axios.get(`${BASE_URL}/allexercises`);
        setExercises(res.data);
      } catch (e) {
        console.log("Error", e);
      }
    }
    getAllExercises();
  }, []);*/

  /*def transform_word(word):
    # Case 1: Capitalize a single word (e.g., "abdominals" -> "Abdominals")
    if '_' not in word:
        return word.capitalize()
    
    # Case 2: Replace underscore with space and capitalize each word (e.g., "lower_back" -> "Lower Back")
    else:
        # Split by underscore, capitalize each part, and join them with a space
        return ' '.join([w.capitalize() for w in word.split('_')])*/
  const transformWord = (word) => {
    if (!word.includes("_")) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    } else {
      return word
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    }
  };

  /*const findExercisesByMuscle = (prevExercises) => {
    setExercises(
      prevExercises.map((exercise) => ({
        ...exercise,
        name: transformWord(exercise.name),
      }))
    );
  };*/
  const findExercisesByMuscle = (data) => {
    setExercises(data);
  };

  return (
    <main>
      <Groups>
        <p>Search among the following exercise groups:</p>
        <ul>
          <li>Abdominals</li>
          <li>Abductors</li>
          <li>Adductors</li>
          <li>Biceps</li>
          <li>Calves</li>
          <li>Chest</li>
          <li>Forearms</li>
          <li>Glutes</li>
          <li>Hamstrings</li>
          <li>Lats</li>
          <li>Lower Back</li>
          <li>Middle Back</li>
          <li>Neck</li>
          <li>Quadriceps</li>
          <li>Traps</li>
          <li>Triceps</li>
        </ul>
      </Groups>
      <section className="search-muscle-group">
        <FindExercisesForm findExercisesByMuscle={findExercisesByMuscle} />
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
export default Home;
