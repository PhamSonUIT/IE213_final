import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DislikeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    videoId: { type: Schema.Types.ObjectId, ref: "Video", required: true },
  },
  {
    collection: "dislikes",
    timestamps: true,
  }
);

export default mongoose.model("Dislike", DislikeSchema);
