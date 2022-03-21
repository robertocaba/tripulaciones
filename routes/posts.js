const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const { authentication } = require("../middlewares/authentication");

router.post("/", authentication, PostController.create);

router.get("/", PostController.getAll);
router.get("/id/:_id", PostController.getById);
router.get("/description/:description", PostController.getByDescription);

router.put("/:_id", PostController.update);
router.put('/like/:_id',authentication, PostController.like)
router.put('/dislike/:_id',authentication, PostController.dislike)

router.delete("/:_id", PostController.delete);

module.exports = router;