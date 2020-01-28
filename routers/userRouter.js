import express from "express";
import routes from "../routes";
import * as userController from "../controllers/userController";
import * as videoController from "../controllers/videoController";

const userRouter = express.Router();

userRouter.get(routes.editProfile, userController.editProfile); //먼저 위치하지 않을 경우 edit-profile을 /:id로 인식
userRouter.get(routes.userDetail(), userController.userDetail);
userRouter.get(routes.changePassword, userController.changePassword);
export default userRouter;

