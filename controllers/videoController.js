import video from '../models/video';
import routes from '../routes';
import Comment from '../models/comment';

export const home = async (req, res) => {
  //async and await
  try {
    const videos = await video.find({}).sort({ _id: -1 });
    res.render('home', { pageTitle: 'Home', videos });
  } catch (error) {
    console.log(error);
    res.render('home', { pageTitle: 'Home', videos: [] });
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
      title: { $regex: searchingBy, $options: 'i' }
    });
  } catch (error) {
    console.log(error);
  }
  res.render('search', { pageTitle: 'search', searchingBy, videos });
};

export const upload = (req, res) => {
  res.render('upload', { pageTitle: 'upload' });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;

  const newVideo = await video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const tempVideo = await video
      .findById(id)
      .populate('creator')
      .populate({
        path: 'comments',
        populate: {
          path: 'creator'
        }
      });
    console.log(tempVideo);
    res.render('videoDetail', { pageTitle: tempVideo.title, video: tempVideo });
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
    if (tempVideo.creator !== req.user.id) {
      throw Error();
    }
    res.render('editVideo', {
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
    const tempVideo = await video.findById(id);
    if (tempVideo.creator !== req.user.id) {
      throw Error();
    }
    await video.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

//api

export const registerView = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const tempVideo = await video.findById(id);
    tempVideo.views += 1;
    tempVideo.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const addComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user
  } = req;

  try {
    const tempVideo = await video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id
    });

    tempVideo.comments.push(newComment.id);
    tempVideo.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
