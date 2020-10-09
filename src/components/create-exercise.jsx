import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CreateExercise() {
  const [form, setVal] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

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
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => console.log(res.data));
  };

  useEffect(() => {
    // Checks to see if there is at least one user in the database
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

  return (
    <>
      <div style={{ marginLeft: 20 }}>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group col-lg-5" style={{ marginLeft: -15 }}>
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
          <div className="form-group col-lg-5" style={{ marginLeft: -15 }}>
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={form.description}
              onChange={(e) => setVal({ ...form, description: e.target.value })}
            />
          </div>
          <div className="form-group col-lg-5" style={{ marginLeft: -15 }}>
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
              style={{ marginLeft: 10 }}
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
              Create Exercise Log
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateExercise;
