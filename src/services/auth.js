const User = require("../models/User");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
var jwt = require("jsonwebtoken");
require("dotenv").config({ path: `${__dirname}/../../.env` });

class AuthService {
  async register(userDTO) {
    const oldUser = await User.findOne({ username: userDTO.username });
    if (oldUser) {
      throw createError.Conflict(`${userDTO.username} already taken!`);
    } else {
      const newUser = new User(userDTO);
      return await newUser.save();
    }
  }

  async login({ username, password }) {
    const user = await User.findOne({ username });
    if (!user) {
      throw createError("Incorrect username or password");
    }
    const isValid = await user.checkedPassword(password);
    if (!isValid) {
      throw createError("Incorrect username or password");
    }
    const token = await jwt.sign(
      { userId: user._id, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      process.env.SECRET_KEY
    );
    return token;
  }
}

module.exports = new AuthService();
