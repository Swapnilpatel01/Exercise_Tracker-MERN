import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CreateUser() {
  const [user, setUser] = useState({
    username: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = {
      username: user.username,
    };
    console.log(users);
    axios
      .post("http://localhost:5000/users/add", users)
      .then((res) => console.log(res.data));
  };

  return (
    <>
      <div style={{ marginLeft: 20 }}>
        <h3>Create a User</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group col-lg-5" style={{ marginLeft: -15 }}>
            <label>Username:</label>
            <input
              type="text"
              className="form-control"
              size="10"
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={user.username.length < 1}
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateUser;
