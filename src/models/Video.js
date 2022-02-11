import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  createAt: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
  },
});
// made shape of video data

const Video = mongoose.model("Video", videoSchema);
// create data model(name of model , shape of data)

export default Video;
