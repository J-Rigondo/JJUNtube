import express from 'express';
import morgan from 'morgan'; //logging
import helmet from 'helmet'; //security
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
//import dotenv from 'dotenv';
import mongoose from 'mongoose';
import mongoStore from 'connect-mongo';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import globalRouter from './routers/globalRouter';
import routes from './routes';
import * as middle from './middleWares';
import './passport';

//dotenv.config();

const app = express();

const CookieStore = mongoStore(session);

app.use(helmet());
app.set('view engine', 'pug');
app.use(['/uploads', '/users/uploads'], express.static('uploads'));
app.use('/static', express.static('static'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(middle.localsMiddleware);
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
