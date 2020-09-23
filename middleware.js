// Make locals Middleware
// local변수를 global변수로 사용할 수 있도록 만들어 주는 Middleware

import routes from "./routes";
import multer from "multer";
//Multer는 파일 업로드를 위해 사용되는 multipart/form-data 를 다루기 위한 node.js의 미들웨어이다.

const multerVideo = multer({ dest: "uploads/videos/" });
//만약 /uplads/vidoes/로 입력하면 컴퓨터의 root에 uploads를 만들 것이다. 조심***

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: false,
    id: 1,
  };
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
/*
body중 multipart/form-data를 포함한 form의 내용을 uploads/videos/의 파일에 저장
위에서는 input태그의 name이 videoFile인 정보만 저장한다.
이 프로젝트에서 upload.pug에서 찾아볼 수 있다.
또한 req.file 은 'videoFile'라는 필드의 파일 정보이다. => videoController.js에서 확인

videoController.js 중 postUpload의 결과 해석 =>

console.log(req.file)의 결과
{ fieldname: 'videoFile',
  originalname: 'file_example_MP4_640_3MG.mp4',
  encoding: '7bit',
  mimetype: 'video/mp4',
  destination: 'uploads/videos/',
  filename: 'a20488bd353b1d2f3b76e947749b92f2',
  path: 'uploads/videos/a20488bd353b1d2f3b76e947749b92f2',
  size: 3114374 }

이중 path값을 Video model의 fileUrl로 지정한다.
*/
