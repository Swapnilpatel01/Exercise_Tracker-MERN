// API Endpoint for Exercises
const router = require("express").Router();
let Exercise = require("../models/exercise.model"); //created from the mongoose model

// First route (endpoint); handles incoming HTTP GET requests on the /exercises/ URL path
router.route("/").get((req, res) => {
  // For '/exercises/' URL
  Exercise.find() // We call 'Users.find()' to get a list of all the users from the database; the results are returned in a JSON format; returns a promise
    .then((exercises) => res.json(exercises)) // Gets all users
    .catch((err) => res.status(400).json("Error: " + err)); // Otherwise returns an error
});

// Second route (endpoint); handles incoming HTTP POST requests on the '/exercises/add/' URL path
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration); // Converts to 'Number' data-type
  const date = Date.parse(req.body.date); // Converts to 'Date" data-type

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save() // The new exercise is saved to the MongoDB Atlas database
    .then(() => res.json("Exercise has been logged"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// '/:id' GET endpoint returns an exercise item with the specific id from MongoDB; entering '/exercises/[id from database]' returns the exercise with that id
router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

// '/:id' DELETE endpoint deletes an exercise item with the specific id from MongoDB; entering '/exercises/[id from database]' deletes the exercise with that id
router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Used to update an existing exercise with the specific id (/exercises/update/[id]); using PUT request because we are updating the information
router.route("/update/:id").put((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
