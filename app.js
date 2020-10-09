import "core-js";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session"; //session을 관리해주기 위해 필요하다
import MongoStore from "connect-mongo"; //session에게 데이터를 MongoStore라는 저장소에 저장하라고 명령하는 미들웨어
import mongoose from "mongoose";

import { localsMiddleware } from "./middleware.js";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";
import globalRouter from "./routers/globalRouter.js";
import routes from "./routes";

import "./passport";

const app = express();
const CokieStore = MongoStore(session);

app.set("view engine", "pug");

// Middleware

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan("dev"));

app.use(
  session({
    secret: process.env.COOKIE_SECRET, // => 필수!!!!
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
//passport는 자신이 찾은 사용자의 요청(req)를 object, 즉 req.user로 만들어준다
//어메이징!

// 전역미들웨어 사용
app.use(localsMiddleware);

// Playing Video
app.use("/uploads", express.static("uploads"));
// localhost:4000/uploads로 가면 'uploads'라는 directory안으로 들어간다.
app.use("/static", express.static("static"));

// Router, Routes
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
