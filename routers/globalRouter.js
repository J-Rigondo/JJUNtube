import express from 'express';
import passport from 'passport';
import routes from '../routes';
import * as userController from '../controllers/userController';
import * as videoController from '../controllers/videoController';
import { onlyPublic, onlyPrivate } from '../middleWares';

const globalRouter = express.Router();

globalRouter.get(routes.home, videoController.home);
globalRouter.get(routes.join, onlyPublic, userController.join);
globalRouter.post(
  routes.join,
  onlyPublic,
  userController.postJoin,
  userController.postLogin
);
globalRouter.get(routes.login, onlyPublic, userController.login);
globalRouter.post(routes.login, onlyPublic, userController.postLogin);
globalRouter.get(routes.logout, onlyPrivate, userController.logout);
globalRouter.get(routes.search, videoController.search);

globalRouter.get(routes.gitHub, userController.githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate('github', { failureRedirect: routes.login }),
  userController.postGithubLogin
);

export default globalRouter;
