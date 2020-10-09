import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is required",
  },
  title: {
    type: String,
    required: "Title is required",
  },
  description: String,
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

//위의 schema를 이용하여 model 만들기 과정
//definition(schema)를 통해 실제 document를 만들기
const model = mongoose.model("Video", VideoSchema);
//const --- = mongoose.model(modelName, schema)
//by default, Mongoose adds an '_id' property to your shemas.
export default model;

/* 
model=실제 data, document name
schema=형태
*/

//=> init.js에 import하기
