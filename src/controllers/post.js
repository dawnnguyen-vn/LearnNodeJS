const postService = require("../services/post");
const { validatePost } = require("../utils/validators");
const createError = require("http-errors");

class PostController {
  async find(req, res, next) {
    try {
      const posts = await postService.find(req.userId);
      res.json({ status: 200, message: "Get posts success!", posts });
    } catch (error) {
      next({ status: error.status, message: error.message });
    }
  }

  async save(req, res, next) {
    try {
      const postDTO = req.body;
      const { error } = validatePost(req.body);
      if (error) {
        throw createError(error.details[0].message);
      }
      postDTO.user = req.userId;
      const newPost = await postService.save(postDTO);
      res.json({ status: 201, message: "Add post success!", newPost });
    } catch (error) {
      next({ status: error.status, message: error.message });
    }
  }

  async update(req, res, next) {
    try {
      const postDTO = req.body;
      const { error } = validatePost(req.body);
      if (error) {
        throw createError(error.details[0].message);
      }
      const updateCondition = {_id: req.params.id, user: req.userId};
      const newPost = await postService.update(postDTO, updateCondition);
      res.json({ status: 200, message: "Update product success!", newPost });
    } catch (error) {
      next({ status: error.status, message: error.message });
    }
  }

  async delete(req, res, next) {
    try {
      const deleteCondition = {_id: req.params.id, user: req.userId};
      const deletePost = await postService.delete(deleteCondition);
      res.json({ status: 200, message: "Delete product success!", deletePost });
    } catch (error) {
      next({ status: error.status, message: error.message });
    }
  }
}
module.exports = new PostController();
