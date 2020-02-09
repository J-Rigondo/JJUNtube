import passport from 'passport';
import routes from '../routes';
import User from '../models/user';

export const join = (req, res) => res.render('join', { pageTitle: 'join' });

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;

  if (password !== password2) {
    res.status(400); //status code
    res.render('join', { pageTitle: 'join' });
  } else {
    try {
      const user = await User({
        //User.create하면 db에 저장까지시켜버려서 아래 register에서 에러남
        name,
        email
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const login = (req, res) => res.render('login', { pageTitle: 'login' });

export const postLogin = passport.authenticate('local', {
  //authenticate는 username과 password를 찾음
  failureRedirect: routes.login,
  successRedirect: routes.home
});

export const githubLogin = passport.authenticate('github');

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url, email, name }
  } = profile;

  try {
    if (!email) {
      throw new Error('email is not exist.');
    }
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.avatarUrl = avatar_url;
      user.save();
      console.log(user);
      return cb(null, user);
    } else {
      const newUser = await User.create({
        email,
        name,
        githubId: id,
        avatarUrl: avatar_url
      });
      console.log(newUser);
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const editProfile = (req, res) =>
  res.render('editProfile', { pagetitle: 'editProfile' });

export const postEditProfile = async (req, res) => {
  const {
    body: { email, name },
    file
  } = req;

  try {
    const user = await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl
    });
    res.redirect(routes.userDetail(req.user.id));
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};

export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  console.log(id);
  const user = await User.findById(id);
  console.log(user);
  return res.render('userDetail', {
    pageTitle: 'userDetail',
    user
  });
};

export const changePassword = (req, res) => res.render('changePassword');

export const postChangePassword = (req, res) => {
  // const {
  //   body: { oldPassword, newPassword, newPassword1 }
  // } = req;
  // try {
  //   if (newPassword !== newPassword1) {
  //     res.status(400);
  //     res.redirect(routes.changePassword);
  //   } else {
  //     req.user.changePassword(oldPassword, newPassword);
  //     res.redirect(routes.home);
  //   }
  // } catch (error) {
  //   res.redirect(routes.changePassword);
  // }
};
