// API Endpoint for Users
const router = require("express").Router();
let User = require("../models/users.model"); //created from the mongoose model

// First route (endpoint); handles incoming HTTP GET requests on the /users/ URL path
router.route("/").get((req, res) => {
  // For '/users/' URL
  User.find() // We call 'Users.find()' to get a list of all the users from the database; the results are returned in a JSON format; returns a promise
    .then((users) => res.json(users)) // Gets all users
    .catch((err) => res.status(400).json("Error: " + err)); // Otherwise returns an error
});

// Second route (endpoint); handles incoming HTTP POST requests on the '/users/add/' URL path
router.route("/add").post((req, res) => {
  const username = req.body.username; // New username that is created
  const newUser = new User({ username }); // Creates new instance of user using created username from above code

  newUser
    .save() // The new user is saved to the MongoDB Atlas database
    .then(() => res.json("User has been added")) // Messaged added when user is added to database
    .catch((err) => res.status(400).json("Error: " + err)); // Error message if failed
});

module.exports = router;
