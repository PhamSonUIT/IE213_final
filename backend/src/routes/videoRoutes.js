import express from "express";
import {
  createVideo,
  getVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  getVideosByType,
  incrementViews,
  likeVideo,
  dislikeVideo,
  addComment,
  getComments,
  getVideosByUsername,
  searchVideos,
} from "../controller/videoController.js";

const videoRoutes = express.Router();

videoRoutes.post("/create", createVideo);
videoRoutes.get("/get-all", getVideos);
videoRoutes.get("/get-by-id/:id", getVideoById);
videoRoutes.put("/update/:id", updateVideo);
videoRoutes.delete("/delete/:id", deleteVideo);
videoRoutes.get("/get-by-type/:type", getVideosByType);
videoRoutes.put("/increment-views/:id", incrementViews);
videoRoutes.put("/like/:id", likeVideo);
videoRoutes.put("/dislike/:id", dislikeVideo);
videoRoutes.post("/add-comment/:id", addComment);
videoRoutes.get("/get-comments/:id", getComments);
videoRoutes.get("/get-by-username/:username", getVideosByUsername);
videoRoutes.get("/search", searchVideos);
export default videoRoutes;
