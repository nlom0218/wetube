import "./db"; //단순히 특정 모듈을 불러와 실행하기 just import the file
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import "./models/Video"; //Video Database가 생성되었다는 사실 인식하기
import "./models/Comment"; //Comment Database가 생성되었다는 사실 인식하기

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅ Listening on: http://localhost:${PORT}`);

// Make server
app.listen(PORT, handleListening);
