const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentController");
const { authentication } = require("../middlewares/authentication");

router.post("/:_id", authentication, CommentController.create);

router.put("/:_id", authentication, CommentController.update);
router.put('/like/:_id',authentication, CommentController.like)
router.put('/dislike/:_id',authentication, CommentController.dislike)

router.delete("/:_id", authentication, CommentController.delete);

module.exports = router;