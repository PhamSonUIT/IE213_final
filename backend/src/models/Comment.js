import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Comments = new Schema(
  {
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    videoId: { type: Schema.Types.ObjectId, ref: "Video", required: true },
  },
  {
    collection: "comments",
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", Comments);

export default Comment;
