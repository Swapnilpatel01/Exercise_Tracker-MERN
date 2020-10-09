import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ExercisesList() {
  const [exercises, setExercise] = useState([]);

  const Exercise = (props) => (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date}</td>
      <td>
        {/* <Link to={"/edit/" + props.exercise._id}>edit</Link> | */}
        <a
          href="#"
          onClick={() => {
            props.deleteExercise(props.exercise._id);
          }}
        >
          Remove
        </a>
      </td>
    </tr>
  );

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/")
      .then((response) => {
        setExercise(response.data); // Adds the list of exercises to the state
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteExercise = (id) => {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((response) => console.log(response.data));
    setExercise(exercises.filter((element) => element._id !== id)); // "_id" is from the id displayed in the MondoDB database
  };

  const ExerciseList = () => {
    return exercises.map((currentExercise) => {
      return (
        <Exercise
          exercise={currentExercise}
          deleteExercise={deleteExercise}
          key={currentExercise._id}
        />
      );
    });
  };

  return (
    <>
      <div style={{ marginLeft: 20, marginRight: 20 }}>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <ExerciseList
              exercise={exercises}
              deleteExercise={deleteExercise}
            />
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ExercisesList;
