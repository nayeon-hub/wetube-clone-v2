import Video from "../models/Video";
import User from "../models/User";
/*
// This is callback
console.log("start")
Video.find({},(error, videos) =>{
  return res.render("home", {pageTitle : "Home", vidoes});
});
*/

export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createAt: "desc" });
  return res.render("home", { pageTitle: "Home", videos });
  // return을 render옆에 써준 이유는 render 이후 자동되는 function이 없도록 하기 위해서("실수 줄입"), return이 없어도 코드에 문제는 없습니다.
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner"); // id로 mongoDB에서 비디오 찾는 함수
  // const video = await Video.findById(id).exec(); exec 함수는 promise를 반환한다.

  if (!video) {
    return res.render("404", { pageTitle: "Video not found" });
  }
  return res.render("videos/watch", {
    pageTitle: video.title,
    video,
  });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);

  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }

  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }

  return res.render("videos/edit", {
    pageTitle: `Edit : ${video.title}`,
    video,
  });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const { title, description, hashtags } = req.body;

  const video = await Video.findById(id);
  // const video = await Video.exists({ _id: id }); // id data object를 가져오지 않고 존재 유무만 판단해도 되기에
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }

  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });

  return res.redirect(`/videos/${id}`);
}; // saving the changes

export const getUpload = (req, res) => {
  return res.render("videos/upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session; // session에는 현재 로그인한 user의 정보가 들어있다.
  const { path: fileUrl } = req.file;
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl,
      owner: _id, // upload - 비디오를 업로드하는 유저 저장
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/"); // browser is taken us
  } catch (error) {
    console.log(error);
    return res.status(400).render("videos/upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  // delete video

  const video = await Video.findById(id);
  const user = await User.findById(_id);
  // const video = await Video.exists({ _id: id }); // id data object를 가져오지 않고 존재 유무만 판단해도 되기에
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }

  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndDelete(id);
  let videoArr = user.videos.filter((el) => String(el) !== String(id));
  user.videos = [...videoArr];
  user.save();
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    // search
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}$`, "i"),
      },
    });
  }
  return res.render("search", { pageTitle: "Search", videos });
};

// you should use findOneAndDelete not use Remove
// findByIdAndDelete(id) is a shorthand for findOneAndDelete({_id : id})
