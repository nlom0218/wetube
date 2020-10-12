import routes from "../routes";
import User from "../models/User";
import passport from "passport";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJion = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(404);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      //=> passport local mongoose(github)에서 찾을 수 있다.
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};
export const postLogin = passport.authenticate("local", {
  //passport 인증방식은 username(email), password를 찾아보도록 설정되어 있어있다.
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

// For Github
export const githubLogin = passport.authenticate("github");
// 이것이 실행이되면 passport.js의 passport.use(new GithubStrategy({~})) 실행된다

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url, name },
  } = profile;
  const { value: email } = profile.emails.filter((item) => item.primary)[0];
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        email,
        name,
        githubId: id,
        avatarUrl: avatar_url,
      });
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};
// End

// For kakao
export const kakaoLogin = passport.authenticate("kakao");

export const kakaoLoginCallback = async (_, __, profile, cb) => {
  const id = profile._json.id;
  const name = profile._json.properties.nickname;
  const profile_image = profile._json.properties.profile_image;
  const email = profile._json.kakao_account.email;
  console.log(id, name, profile_image, email);
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.kakaoId = id;
      user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        name,
        kakaoId: id,
        avatarUrl: profile_image,
        email,
      });
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};

export const postkakaoLogin = (req, res) => {
  res.redirect(routes.home);
};
// End

//naver
export const naverLogin = passport.authenticate("naver");

export const naverLoginCallback = async (_, __, profile, cb) => {
  const id = profile._json.id;
  const email = profile._json.email;
  const nickname = profile._json.nickname;
  const avatarUrl = profile._json.profile_image;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.naverId = id;
      user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        id,
        email,
        nickname,
        avatarUrl,
      });
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};

export const postNaverLogin = (req, res) => {
  res.redirect(routes.home);
};
//end

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getMe = async (req, res) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id).populate("videos");
    console.log(user);
    res.render("userDetail", { pageTitle: "Edit Profile", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) => {
  res.render("editProfile", { pageTitle: "Edit Profile" });
};

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(
      { _id: req.user.id },
      {
        name,
        email,
        avatarUrl: file ? file.location : req.user.avatarUrl,
        // file이 있으면 file.path 그렇지 않으면 req.user.avatarUrl
      }
    );
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(`/user${routes.editProfile}`);
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    // https://www.npmjs.com/package/passport-local-mongoose
    res.redirect(routes.me);
  } catch (error) {
    res.status(400);
    res.redirect(`/users${routes.changePassword}`);
  }
};
