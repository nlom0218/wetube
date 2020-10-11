import express from "express";
import {
  postAddComment,
  postRegisterView,
  postDelectComment,
} from "../controllers/videoController";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.delectComment, postDelectComment);

export default apiRouter;
