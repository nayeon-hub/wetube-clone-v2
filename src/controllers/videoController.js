export const trendingVideos = (req, res) => res.render("home");
export const see = (req, res) => res.render("watch");

export const edit = (req, res) => res.render("edit");
export const deleteVideo = (req, res) => {
  return res.send("Delete Video");
};
export const upload = (req, res) => res.send("Upload Video");
export const search = (req, res) => res.send("Search Video");
