import routes from "./routes";
import multer from "multer";

export const uploadVideo = multer({
  dest: "uploads/videos/" //해당 위치가 프로젝트 파일 안의 디렉토리라고 생각함
});

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "JJunTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1
  };
  next();
};

export const uploadVideoMiddleware = uploadVideo.single("videoFile");
