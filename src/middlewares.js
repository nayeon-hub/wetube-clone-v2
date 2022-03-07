// customizing middlewares
import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn); // view가 loggedIn, sitename, loggedInUser에 접근하기 위해
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    // not login
    next();
  } else {
    // login
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: { fileSize: 3000000 }, // 3,000,000bytes === 3MB
});
export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: { fileSize: 50000000 }, // 10,000,000bytes === 10MB
});
