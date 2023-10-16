const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  telephone: String,
  role: String,
  adresse: String,
  email: {
    unique: true,
    type: String,
  },
  password: String,
  passwordtext: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
