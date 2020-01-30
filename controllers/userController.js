import routes from "../routes";

export const join = (req, res) => {
  return res.render("join", { pageTitle: "join" });
};

export const postJoin = (req, res) => {
  const {
    body: { name, email, password, password2 }
  } = req;

  if (password !== password2) {
    res.status(400); //status code
    res.render("join", { pageTitle: "join" });
  } else {
    res.redirect(routes.home);
  }
};

export const login = (req, res) => {
  return res.render("login", { pageTitle: "login" });
};

export const postLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  res.redirect(routes.home);
};

export const editProfile = (req, res) => {
  return res.render("editProfile", { pagetitle: "editProfile" });
};

export const userDetail = (req, res) => {
  return res.render("userDetail", { pageTitle: "userDetail" });
};

export const changePassword = (req, res) => {
  return res.render("changePassword", { pageTitle: "changePassword" });
};
