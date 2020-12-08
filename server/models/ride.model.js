const { Schema, model } = require("mongoose");
// const User = require("./user.model");
// const Comment = require("./comment.model");

const rideSchema = new Schema({
  title: String,
  description: String,
  /* gpxUrl: String, */ //TODO NEED TO ADD THIS THROUGH OUT THE RIDE DETAILS AND FORMS
  imageUrl: String, //!! For testing purposes
  meetingTime: String,
  startLocation: String,
  endLocation: String,
  rideLength: Number,
  ridePace: Number,
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  publisher: { type: Schema.Types.ObjectId, ref: "User" }, // owner will be added later on
  participant: [{ type: Schema.Types.ObjectId, ref: "User" }], // To be used when user subscribe to  will be added later on
});

module.exports = model("Ride", rideSchema);