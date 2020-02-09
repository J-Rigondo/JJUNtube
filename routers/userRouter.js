import express from 'express';
import routes from '../routes';
import * as userController from '../controllers/userController';
import { onlyPrivate, uploadAvatarMiddleware } from '../middleWares';

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, userController.editProfile); //먼저 위치하지 않을 경우 edit-profile을 /:id로 인식
userRouter.post(
  routes.editProfile,
  onlyPrivate,
  uploadAvatarMiddleware,
  userController.postEditProfile
);

userRouter.get(routes.userDetail(), userController.userDetail);

userRouter.get(
  routes.changePassword,
  onlyPrivate,
  userController.changePassword
);
userRouter.post(
  routes.changePassword,
  onlyPrivate,
  userController.postChangePassword
);
export default userRouter;
