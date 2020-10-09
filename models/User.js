//https://github.com/saintedlama/passport-local-mongoose#api-documentation
// Passport Local Mongoose!!!!! 넘나 좋은거 꼭 쓰자~~~!!!!
// => 패스워드 설정, 패스워드 확인 등등을 자동으로

import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number,
  kakaoId: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });
// UserSchema 는 앞으로 local-mongoose strategy를 사용하겠다 땅땅땅!
// usernameField: specifies the field name that holds the username.
// Defaults to 'username'. This option can be used if you want to use a different field
// to hold the username for example "email".

const model = mongoose.model("User", UserSchema);

export default model;
//=> init.js에 import하기
