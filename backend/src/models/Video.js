import mongoose from "mongoose";

const Schema = mongoose.Schema;

const VideoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true },
    thumbnail: { type: String },
    type: { type: String },
    views: { type: Number, default: 0 },
    likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    collection: "videos",
    timestamps: true,
  }
);

export default mongoose.model("Video", VideoSchema);
