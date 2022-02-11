export const trendingVideos = (req, res) => {
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
  res.render("home", { pageTitle: "Home", videos });
};
export const see = (req, res) => res.render("watch", { pageTitle: "Watch" });

export const edit = (req, res) => res.render("edit", { pageTitle: "Edit" });
export const deleteVideo = (req, res) => {
  return res.send("Delete Video");
};
export const upload = (req, res) => res.send("Upload Video");
export const search = (req, res) => res.send("Search Video");
