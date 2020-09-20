import express from "express";
import {
  deleteVideo,
  getEditVideo,
  getUpload,
  postEditVideo,
  postUpload,
  videosDetail,
} from "../controllers/videoController";
import { uploadVideo } from "../middleware";
import routes from "../routes";

const videoRouter = express.Router();

// Upload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

// Video Detail
videoRouter.get(routes.videosDetail(), videosDetail);
// routes.videosDetail() => /:id

// Video Edit
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);
// routes.editVideo() => /:id/edit

// Video Delete
videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;
