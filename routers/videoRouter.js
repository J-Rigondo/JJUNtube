import express from 'express';
import routes from '../routes';
import * as videoController from '../controllers/videoController';
import { uploadVideoMiddleware, onlyPrivate } from '../middleWares';

const videoRouter = express.Router();

videoRouter.get(routes.upload, onlyPrivate, videoController.upload);
videoRouter.post(
  routes.upload,
  uploadVideoMiddleware,
  videoController.postUpload
);

videoRouter.get(routes.videoDetail(), videoController.videoDetail);

videoRouter.get(routes.editVideo(), onlyPrivate, videoController.editVideo);
videoRouter.post(
  routes.editVideo(),
  onlyPrivate,
  videoController.postEditVideo
);

videoRouter.get(routes.deleteVideo(), onlyPrivate, videoController.deleteVideo);

export default videoRouter; //전체를 export
