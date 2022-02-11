import res from "express/lib/response";

const videos = [
  {
    title: "First Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minuts ago",
    views: 59,
    id: 1,
  },
  {
    title: "Second Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minuts ago",
    views: 59,
    id: 2,
  },
  {
    title: "Third Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minuts ago",
    views: 59,
    id: 3,
  },
];

export const trendingVideos = (req, res) => {
  res.render("home", { pageTitle: "Home", videos });
};
export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  console.log("Show video", id);
  return res.render("watch", {
    pageTitle: `Watching :  ${video.title}`,
    video,
  });
};

export const getEdit = (req, res) => {
  // painting the form
  const { id } = req.params;
  const video = videos[id - 1];
  console.log("Show video", id);
  return res.render("edit", { pageTitle: `Editing : ${video.title}`, video });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
}; // saving the changes

export const deleteVideo = (req, res) => {
  return res.send("Delete Video");
};
export const upload = (req, res) => res.send("Upload Video");
export const search = (req, res) => res.send("Search Video");
