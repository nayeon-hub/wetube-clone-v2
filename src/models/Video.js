import mongoose from "mongoose";

export const formatHashtags = (hashtags) =>
  hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word.trim() : `#${word.trim()}`));

//Schema's power!!!
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 20 },
  description: { type: String, required: true, trim: true, minLength: 35 }, // database에서도 minlenght,maxlength를 설정해줘서 혹시나 발생할 오류를 막아준다.
  createAt: { type: Date, required: true, default: Date.now }, // 따로 createAt key를 넣지 않아도 알아서 해줌 - default value : ()는 뺴주어야 즉시 실행이 안된다.
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true }, // 사실 default값이 있으면 required는 언제나 true이지만 그래도 적어준 것이다.
    rating: { type: Number, default: 0, required: true },
  },
});
// made shape of video data

// videoSchema.static("formatHashtags", function (hashtags) {
//   return hashtags
//     .split(",")
//     .map((word) => (word.startsWith("#") ? word.trim() : `#${word.trim()}`));
// });

const Video = mongoose.model("Video", videoSchema);
// create data model(name of model , shape of data)

export default Video;
