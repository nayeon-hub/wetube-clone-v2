export const trendingVideos = (req, res) =>
  res.render("home", { pageTitle: "Home" });
export const see = (req, res) => res.render("watch", { pageTitle: "Watch" });

export const edit = (req, res) => res.render("edit", { pageTitle: "Edit" });
export const deleteVideo = (req, res) => {
  return res.send("Delete Video");
};
export const upload = (req, res) => res.send("Upload Video");
export const search = (req, res) => res.send("Search Video");
