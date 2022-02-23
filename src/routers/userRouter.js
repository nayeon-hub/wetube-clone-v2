import express from "express";
import {
  see,
  logout,
  edit,
  remove,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin); // github.com에서 설정
userRouter.get("/:id", see);

export default userRouter;
