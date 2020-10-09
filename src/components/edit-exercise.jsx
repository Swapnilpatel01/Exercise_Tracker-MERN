import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function EditExercise(props) {
  const [form, setVal] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/" + props.match.params.id)
      .then((response) => {
        setVal({
          ...form,
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get("http://localhost:5000/users/").then((response) => {
      if (response.data.length > 0) {
        setVal({
          ...form,
          users: response.data.map((user) => user.username), // "response.data.map" only returns the "username" from the fields as shown in the database
          username: response.data[0].username, // first username in the "users" array from database
        });
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username: form.username,
      description: form.description,
      duration: form.duration,
      date: form.date,
    };

    console.log(exercise);
    axios
      .put(
        "http://localhost:5000/exercises/update/" + props.match.params.id,
        exercise
      )
      .then((res) => console.log(res.data));
    window.location = "/";
  };

  return (
    <>
      <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              required
              className="form-control"
              value={form.username}
              onChange={(e) => setVal({ ...form, username: e.target.value })}
            >
              {form.users.map((user) => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={form.description}
              onChange={(e) => setVal({ ...form, description: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              type="number"
              className="form-control"
              value={form.duration}
              onChange={(e) => setVal({ ...form, duration: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <input
              type="date"
              selected={form.date}
              onChange={(e) => setVal({ ...form, date: e.target.value })}
            />
          </div>

          <div className="form-group">
            <button
              type="submit"
              disabled={form.description.length < 1}
              className="btn btn-primary"
            >
              Edit Exercise
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditExercise;
