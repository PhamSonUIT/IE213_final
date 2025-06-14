import { Video, Comment, User } from "../models/index.js";
import mongoose from "mongoose";

const createVideo = async (req, res) => {
  try {
    const { title, description, type, url, thumbnail, userId } = req.body;

    const video = await Video.create({
      title,
      description,
      type,
      url,
      thumbnail,
      userId,
      views: 0,
      likes: [],
      dislikes: [],
    });
    return res.status(201).json(video);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getVideos = async (req, res) => {
  try {
    const allVideos = await Video.find().populate("userId", "username avatar");
    return res.status(200).json(allVideos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id).populate(
      "userId",
      "username avatar followers"
    );
    if (!video) return res.status(404).json({ message: "Video not found" });
    return res.status(200).json(video);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getVideosByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const videos = await Video.find({ userId: user._id })
      .populate('userId', 'username'); 
    console.log(videos);
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, type, url, thumbnail } = req.body;
    const video = await Video.findByIdAndUpdate(
      id,
      { title, description, type, url, thumbnail },
      { new: true }
    );
    if (!video) return res.status(404).json({ message: "Video not found" });
    return res.status(200).json(video);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findByIdAndDelete(id);
    if (!video) return res.status(404).json({ message: "Video not found" });
    return res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getVideosByType = async (req, res) => {
  try {
    const { type } = req.params;
    const videos = await Video.find({ type }).populate(
      "userId",
      "username avatar"
    );
    return res.status(200).json(videos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const incrementViews = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!video) return res.status(404).json({ message: "Video not found" });
    return res.status(200).json(video);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    const { userId } = req.body;

    if (!video) return res.status(404).json({ message: "Video not found" });
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ message: "Invalid userId" });

    const userIdStr = userId.toString();

    if (video.likes.some((id) => id.toString() === userIdStr)) {
      video.likes = video.likes.filter((id) => id.toString() !== userIdStr);
    } else {
      video.likes.push(userId);
      video.dislikes = video.dislikes.filter(
        (id) => id.toString() !== userIdStr
      );
    }

    await video.save();

    const updatedVideo = await Video.findById(req.params.id).populate(
      "userId",
      "username avatar followers"
    );
    return res.status(200).json(updatedVideo);
  } catch (error) {
    console.error("Error liking video:", error);
    return res.status(500).json({ message: "Error liking video", error });
  }
};

const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    const { userId } = req.body;

    if (!video) return res.status(404).json({ message: "Video not found" });
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ message: "Invalid userId" });

    const userIdStr = userId.toString();

    if (video.dislikes.some((id) => id.toString() === userIdStr)) {
      video.dislikes = video.dislikes.filter(
        (id) => id.toString() !== userIdStr
      );
    } else {
      video.dislikes.push(userId);
      video.likes = video.likes.filter((id) => id.toString() !== userIdStr);
    }

    await video.save();

    const updatedVideo = await Video.findById(req.params.id).populate(
      "userId",
      "username avatar followers"
    );
    return res.status(200).json(updatedVideo);
  } catch (error) {
    console.error("Error disliking video:", error);
    return res.status(500).json({ message: "Error disliking video", error });
  }
};

const addComment = async (req, res) => {
  try {
    const { id: videoId } = req.params;
    const { userId, content } = req.body;

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const newComment = new Comment({ videoId, userId, content });
    await newComment.save();

    const populatedComment = await Comment.findById(newComment._id).populate(
      "userId",
      "username avatar"
    );

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const { id: videoId } = req.params;
    const comments = await Comment.find({ videoId })
      .populate("userId", "username avatar")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const searchVideos = async (req, res) => {
  try {
    const query = req.query.q;
    if (typeof query !== "string") return res.status(400).json({ message: "Invalid query format" });

    const matchedUsers = await User.find({ username: { $regex: query, $options: "i" } }).select("_id");
    const userIds = matchedUsers.map((user) => user._id);

    const videos = await Video.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { userId: { $in: userIds } },
      ],
    }).populate("userId", "username avatar");

    return res.status(200).json(videos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};




export {
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
};
