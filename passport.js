// https://github.com/saintedlama/passport-local-mongoose#api-documentation
// Configure Passport/Passport-Local

// import dotenv from "dotenv";
// dotenv.config();

import passport from "passport";
import GithubStrategy from "passport-github";
//import FacebookStrategy from "passport-facebook";
import KakaoStrategy from "passport-kakao";
import {
  githubLoginCallback,
  kakaoLoginCallback,
} from "./controllers/userController";
// requires the model with Passport-Local Mongoose plugged in
import User from "./models/User";
import routes from "./routes";

// use static authenticate method of model in LocalStrategy
// passport.use(new LocalStrategy(User.authenticate()));
// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());
//createStrategy() Creates a configured passport-local LocalStrategy
//instance that can be used in passport.

// Github
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
      scope: "user:email",
    },
    githubLoginCallback
  )
);

// Facebook
passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KK_ID,
      callbackURL: `http://localhost:4000${routes.kakaoCallback}`,
    },
    kakaoLoginCallback
  )
);

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
// serializeUser() Generates a function that is used by Passport to serialize users into the session
passport.deserializeUser(User.deserializeUser());
// eserializeUser() Generates a function that is used by Passport to deserialize users into the session

// passport => 말 그대로 passport
// passport-local => username과 password를쓰는 사용자 인증 방식(strategy)
