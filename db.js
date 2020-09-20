// First be sure you have MongoDB and Node.js installed.

import mongoose from "mongoose";
import dotenv from "dotenv"; //Afer import dotenv creat a .evn file
dotenv.config(); // .evn파일 안에 있는 정보를 불러온다.

mongoose.connect(process.env.MONGO_URL, {
  //connection to the we-tube database
  //process.evn.MONGO_URL: .evn파일에 선언된 MONGO_URL을 가져온다.
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) =>
  console.log(`❌ Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
// Notified if we connect successfully or if a connection error occurs

/*
mongodb는 NoSQL Database로 특징은 규칙이 적고 엄청 유연하다.
또한 장점으로는 document를 줄여준다.
mongo를 JavaScript와 연결하는 방법 두 가지중 한 가지는 바로 mongoose이다.
즉, mongoose는 Database와 연결하게 해준다.
공홈) mongoose : elegant mongodb object modeling for node.js

dotevn를 설정하는 이유는 DB url를 감추기 위해서이다. 
DB url이 노출되어서 Github에 올라가면 보안상 위험이 생길 수 있기 때문
*/
