import express from 'express';
import routes from '../routes';
import * as videoController from '../controllers/videoController';

const apiRouter = express.Router();

apiRouter.post(routes.registerView, videoController.registerView);
apiRouter.post(routes.addComment, videoController.addComment);
export default apiRouter;
