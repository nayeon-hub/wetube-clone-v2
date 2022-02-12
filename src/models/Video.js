import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createAt: { type: Date, required: true, default: Date.now }, // 따로 createAt key를 넣지 않아도 알아서 해줌 - default value : ()는 뺴주어야 즉시 실행이 안된다.
  hashtags: [{ type: String }],
  meta: {
    views: { type: Number, default: 0, required: true }, // 사실 default값이 있으면 required는 언제나 true이지만 그래도 적어준 것이다.
    rating: { type: Number, default: 0, required: true },
  },
});
// made shape of video data

const Video = mongoose.model("Video", videoSchema);
// create data model(name of model , shape of data)

export default Video;
