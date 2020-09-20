import routes from "../routes";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJion = (req, res) => {
  const {
    body: { password, password2 },
  } = req;
  if (password !== password2) {
    res.status(404);
    res.render("join", { pageTitle: "Join" });
  } else {
    // To Do : Register User(사용자 등록)
    // To Do : Log user in(사용자 로그인)
    res.redirect(routes.login);
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};
export const postLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  // To Do : Process Log out
  res.redirect(routes.home);
};

export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });
