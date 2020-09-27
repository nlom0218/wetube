import express from "express";
import passport from "passport";
import {
  getJoin,
  getLogin,
  githubLogin,
  logout,
  getMe,
  postGithubLogIn,
  postJion,
  postLogin,
  kakaoLogin,
  postkakaoLogin,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { onlyPrivate, onlyPublic } from "../middleware";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJion, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);

globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.search, search);

// Github
globalRouter.get(routes.github, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }), // => githubLoginCallback 실행
  postGithubLogIn
);

// Facebook
globalRouter.get(routes.kakao, kakaoLogin);
globalRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao", { failureRedirect: "/login" }),
  postkakaoLogin
);

globalRouter.get(routes.me, getMe);

export default globalRouter;
