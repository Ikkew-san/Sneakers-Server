const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
  return token;
};

module.exports = mongoose.model("users", userSchema);
