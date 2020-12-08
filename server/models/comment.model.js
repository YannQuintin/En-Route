const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  title: String,
  description: String,
  publisher: { type: Schema.Types.ObjectId, ref: "User" }, // owner will be added later on
  ride: {
    type: Schema.Types.ObjectId,
    ref: "Ride",
  },
});

module.exports = model("Comment", commentSchema);