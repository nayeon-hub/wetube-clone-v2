// customizing middlewares

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn); // view가 loggedIn, sitename, loggedInUser에 접근하기 위해
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user;
  // console.log(res.locals);
  next();
};
