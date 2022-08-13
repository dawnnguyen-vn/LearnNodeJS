const { validateUser } = require("../utils/validators");
const createError = require("http-errors");
const authService = require("../services/auth");

class AuthController {
  async register(req, res, next) {
    try {
      const { username, password } = req.body;
      const { error } = validateUser(req.body);
      if (error) {
        throw createError(error.details[0].message);
      }
      const newUser = await authService.register({ username, password });
      res.json({ status: 201, message: "Register success!", newUser });
    } catch (e) {
      next({ status: e.status, message: e.message });
    }
  }

  async login(req, res, next) {
    try {
      const { error } = validateUser(req.body);
      if (error) {
        throw createError(error.details[0].message);
      }
      const userDTO = req.body;
      const jwt = await authService.login(userDTO);
      res.json({ status: 200, message: "Login success!", jwt });
    } catch (e) {
      next({ status: 500, message: e.message });
    }
  }
}

module.exports = new AuthController();
