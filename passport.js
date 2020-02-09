import passport from 'passport';
import GithubStrategy from 'passport-github';
import dotenv from 'dotenv';
import User from './models/user';
import { githubLoginCallback } from './controllers/userController';
import routes from './routes';

dotenv.config();
passport.use(User.createStrategy());
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:3000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);
passport.serializeUser(User.serializeUser()); //쿠키에 user id만 담아줌
passport.deserializeUser(User.deserializeUser());
