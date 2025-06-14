import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LikeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    videoId: { type: Schema.Types.ObjectId, ref: "Video", required: true },
  },
  {
    collection: "likes",
    timestamps: true,
  }
);

export default mongoose.model("Like", LikeSchema);
