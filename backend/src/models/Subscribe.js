import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SubscribeSchema = new Schema(
  {
    subscriber: { type: Schema.Types.ObjectId, ref: "User", required: true },
    subscribing: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    collection: "subscribe",
    timestamps: true,
  }
);

export default mongoose.model("Subscribe", SubscribeSchema);
