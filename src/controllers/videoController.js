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

export const watch = (req, res) => {
  const { id } = req.params;
  return res.render("watch", {
    pageTitle: `Watching `,
  });
};

export const getEdit = (req, res) => {
  // painting the form
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing` });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
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
      hashtags: `${hashtags.split(",").map((word) => word.replace(" ", ""))}`,
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
