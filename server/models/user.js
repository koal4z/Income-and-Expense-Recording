const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

module.exports = User;
