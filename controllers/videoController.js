import video from "../models/video";
import routes from "../routes";

export const home = async (req, res) => {
  //async and await
  try {
    const videos = await video.find({}).sort({ _id: -1 });
    console.log(videos);
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  //const searchingBy = req.query.term;
  const {
    query: { term: searchingBy }
  } = req;

  let videos = [];
  try {
    videos = await video.find({
      title: { $regex: searchingBy, $options: "i" }
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "search", searchingBy, videos });
};

export const upload = (req, res) => {
  res.render("upload", { pageTitle: "upload" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;

  const newVideo = await video.create({
    fileUrl: path,
    title,
    description
  });
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const tempVideo = await video.findById(id);
    res.render("videoDetail", { pageTitle: tempVideo.title, video: tempVideo });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const editVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const tempVideo = await video.findById(id);
    res.render("editVideo", {
      pageTitle: `Edit ${tempVideo.title}`,
      video: tempVideo
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;

  const {
    body: { title, description }
  } = req;

  try {
    await video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    await video.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
