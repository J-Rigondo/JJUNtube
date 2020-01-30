import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "video"
  }
});

const model = mongoose.model("comment", commentSchema);

export default model;
