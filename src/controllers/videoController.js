import Video from "../models/Video";

/*
// This is callback
console.log("start")
Video.find({},(error, videos) =>{
  return res.render("home", {pageTitle : "Home", vidoes});
});
*/

export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos });
  // return을 render옆에 써준 이유는 render 이후 자동되는 function이 없도록 하기 위해서("실수 줄입"), return이 없어도 코드에 문제는 없습니다.
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id); // id로 mongoDB에서 비디오 찾는 함수
  // const video = await Video.findById(id).exec(); exec 함수는 promise를 반환한다.

  if (!video) {
    return res.render("404", { pageTitle: "Video not found" });
  }
  return res.render("watch", {
    pageTitle: video.title,
    video,
  });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

  if (!video) {
    return res.render("404", { pageTitle: "Video not found" });
  }
  return res.render("edit", {
    pageTitle: `Edit : ${video.title}`,
    video,
  });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "Video not found" });
  }
  // await Video.findByIdAndUpdate(id, {
  //   title,
  //   description,
  //   hashtags: hashtags
  //     .split(",")
  //     .map((word) => (word.startsWith("#") ? word.trim() : `#${word.trim()}`)),
  // });

  video.title = title;
  video.description = description;
  video.hashtags = hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word.trim() : `#${word.trim()}`));
  await video.save();

  return res.redirect(`/videos/${id}`);
}; // saving the changes

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: `${hashtags.split(",").map((word) => `#${word.trim()}`)}`,
    });
    return res.redirect("/"); // browser is taken us
  } catch (error) {
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = (req, res) => {
  return res.send("Delete Video");
};
export const search = (req, res) => res.send("Search Video");
