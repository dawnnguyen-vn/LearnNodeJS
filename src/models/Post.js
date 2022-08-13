const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    url: {
      type: String,
    },
    status: {
      type: String,
      enum: ["TO LEARN", "LEARNING", "LEARNED"],
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Post", Post);
