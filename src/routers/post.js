const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, postController.find);
router.post("/", verifyToken, postController.save);
router.put("/:id", verifyToken, postController.update);
router.delete("/:id", verifyToken, postController.delete);

module.exports = router;
