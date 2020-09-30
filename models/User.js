//https://github.com/saintedlama/passport-local-mongoose#api-documentation

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
