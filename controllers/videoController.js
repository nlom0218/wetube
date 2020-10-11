import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";

//fucntion에 async를 추가함으로써 function의 어떤 부분은 꼭 기다려야 한다.
export const home = async (req, res) => {
  console.log(req.user);
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    //await은 다음 과정이 끝날 때까지 잠시 기다려라.
    //await MyModel.find({}) - find all documents
    //.sort({_id:-1}) => 데이터의 순서를 바꾸겠다! -1은 내리차순으로!
    //console.log(videos);
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
      //description: { $regex: searchingBy, $options: "i" },
      //<field>: { $regex: /pattern/, $options: "<options"}
      // <field> => VideoSchema에서의 title, description 등등
      // /pattenr/ => 해당 글자를 포함된 문장, 단어가있으면 선택된다.
      // 위의 경우 title에 내가 검색한 단어가 포함되면 선택되어 나타난다.
      // "<options>" => 여러가지 옵션들,, 참고로 i옵션은 대소문자 구분 없이 검색 가능
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }, // => localMiddleWare의 multer가 주는 것!
  } = req;
  //console.log(req.file);
  //const title = req.body.title
  //const description = req.body.description
  //const path = req.file.path
  const newVideo = await Video.create({
    //VidoeSchema을 기준으로 밑의 정보가 추가 업로드 된 문서를 데이터베이스에 저장
    fileUrl: path,
    title,
    description,
    creator: req.user.id,
  });
  //console.log(newVideo);
  req.user.videos.push(newVideo.id);
  // user 정보의 vidoes array에 업로드한 비디오의 아이디
  req.user.save();
  res.redirect(routes.videosDetail(newVideo.id));
};

export const videosDetail = async (req, res) => {
  //console.log(req.params);
  //위의 결과 id값이 나오는 이유는 routes.js에서 /:id를 가지고 있기 때문
  //바로 위와 아래의 방법이 url로 부터 정보를 가져오는 유일한 방법이다.
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    res.render("videosDetail", { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id).populate("creator");
    if (req.user.id === video.creator.id) {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    } else {
      res.redirect(routes.home);
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    //_id가 id값인 data를 찾고 그 data의 title, description을 바꾸기
    res.redirect(routes.videosDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id).populate("creator");
    if (req.user.id === video.creator.id) {
      await Video.findOneAndRemove({ _id: id });
    } else {
      res.redirect(routes.home);
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

/*
로직의 흐름???????????
---------------1---------------
videosDetial.pug에서 Edit Video를 누르면 href=routes.editVideo(video.id) 발동!!!
---------------2---------------
주소창에 localhost:4000/videos/video.id(뭐가 되었든) 가 검색된다!!!
---------------3---------------
videoRouter.js에서 해당 주소를 찾기 시작
---------------4---------------
routes.upload인가? 아니다 다음!
즉 localhost:4000/videos/upload의 주소를 가졌냐 아니잖아! 그럼 내려가!
---------------5---------------
routes.videosDetail()인가?
즉 localhost:4000/videos/:id의 주소를 가졌냐 그렇다! 그럼 그 다음으로!
video.id 가 바로바로바로 :id가 되는겄!!!
그렇기 때문에 req.params.id에 video.id가 나타나는 것!!!
---------------6---------------
videoDontroller.js의 videosDetail의 함수를 실행해라~! 이 말씀이다!!!
*/

// API, Register Video View
export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1; // === video.views = video.views + 1
    video.save();
    res.status(200);
  } catch {
    res.status(400);
  } finally {
    res.end();
  }
};

// Add Comment
export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    console.log(newComment);
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Delect Comment
export const postDelectComment = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Comment.findOneAndRemove({ _id: id });
  } catch (error) {
    res.status(400);
  } finally {
    res.end;
  }
};
