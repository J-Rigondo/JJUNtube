import express from "express";
import routes from "../routes";
import * as userController from "../controllers/userController";
import * as videoController from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get(routes.upload, videoController.upload);
videoRouter.post(routes.upload, videoController.postUpload);
videoRouter.get(routes.videoDetail(), videoController.videoDetail);
videoRouter.get(routes.editVideo, videoController.editVideo);
videoRouter.get(routes.deleteVideo, videoController.deleteVideo);

export default videoRouter; //전체를 export