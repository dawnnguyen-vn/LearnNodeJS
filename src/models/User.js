const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const User = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, require: true },
  },
  { timestamps: true, versionKey: false }
);

User.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});


User.methods.checkedPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw createError(error.details[0].message);
    }
}

module.exports = mongoose.model("User", User);
