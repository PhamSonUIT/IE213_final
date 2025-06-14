import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String },
    password: { type: String },
    avatar: { type: String },
    bio: { type: String },
    subsCount: { type: Number, default: 0 },
    subscribingCount: { type: Number, default: 0 },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
