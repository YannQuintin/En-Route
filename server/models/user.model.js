const { Schema, model } = require("mongoose");

const userSchema = new Schema (
    {
        username: String,
        password: String,
        googleId: String,
        email: String,
        imageUrl : String,
        description: String,
        sports: String,
        rides: [{ type: Schema.Types.ObjectId, ref: "Ride" }], //TODO add this throughout the user routes / forms
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
)

module.exports = model("User", userSchema);