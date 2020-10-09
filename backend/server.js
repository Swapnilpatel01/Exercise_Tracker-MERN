const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Will help us conenct to MongoDB database

const app = express();

require("dotenv").config(); // lets have environment variables in the dotenv file

app.use(cors());
app.use(express.json());

// Used to store our database; URI = connection string from MongoDB Atlas
const uri = process.env.ATLAS_URI; // 'ATLAS_URI' is an environment variable; in order to establish connection to the MongoDB database, this variable must be set to the connection
// provided from the MongoDB Atlas dashboard
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// Connects to the database
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully...");
});

// Loads the routers from the other files (exercies and users); the routers are then used as middleware
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter); // when someone puts '/exercises' at the end of the url (https://localhost:5000), then it routes them to this page
app.use("/users", usersRouter); // same as above, routes to the 'users' page

// Server running
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
