const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
  title: String,
  description: String,
  publisher: { type: Schema.Types.ObjectId, ref: "User" },
  ride: {
    type: Schema.Types.ObjectId,
    ref: "Ride",
  },
  },
  {
    timestamps: { createdAt: "updated_at", updatedAt: "updated_at" }
  }
);

module.exports = model("Comment", commentSchema);