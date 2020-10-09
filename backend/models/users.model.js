// User Schema:
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      minlength: 3,
      required: true,
    },
  },
  {
    timestamps: true, // creates fields for when the username was created and modified
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
