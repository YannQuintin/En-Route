const { Schema, model } = require("mongoose");
// const User = require("./user.model");
// const Comment = require("./comment.model");


//TODO 
// 1 - add meetingTime + transform to meetingDate
//?? DONE RideList, RideDetails, AddRideForm, EditRideForm, ride.routes.js
/* gpxUrl: String, */ // 2 - NEED TO ADD THIS THROUGH OUT THE RIDE DETAILS AND FORMS
// 3 - update participant to participants

const rideSchema = new Schema(
  {
  title: String,
  description: String,
  imageUrl: String,
  meetingDate: {type: String},
  meetingTime: {
    type: String,
    // match: [$regex: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Time entered 12:00"], 
  },
  startLocation: String,
  endLocation: String,
  rideLength: Number,
  ridePace: Number,
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  publisher: { type: Schema.Types.ObjectId, ref: "User" },
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }] // To be used when user subscribe to  will be added later on
  },
  {
    timestamps: { createdAt: "updated_at", updatedAt: "updated_at" }
  }
);

module.exports = model("Ride", rideSchema);