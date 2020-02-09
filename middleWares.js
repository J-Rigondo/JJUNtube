import multer from 'multer';
import routes from './routes';

export const uploadVideo = multer({
  dest: 'uploads/videos/' //해당 위치가 프로젝트 파일 안의 디렉토리라고 생각함
});

export const uploadAvatar = multer({ dest: 'uploads/avatars/' });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'JJunTube';
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null; //passport가 user가 담긴 object를 request에 올려줌
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideoMiddleware = uploadVideo.single('videoFile');
export const uploadAvatarMiddleware = uploadAvatar.single('avatar');
