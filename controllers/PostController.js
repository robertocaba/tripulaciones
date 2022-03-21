const Post = require("../models/Post.js");
const User = require("../models/User.js");

const PostController = {
  async create(req, res) {
    try {
      const post = await Post.create({ ...req.body, userId: req.user._id });
      await User.findByIdAndUpdate(req.user._id, {
        $push: { postIds: post._id },
      });
      res.status(201).send(post);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al crear el post" });
    }
  },
  async getAll(req, res) {
    try {
      const posts = await Post.find().populate("comments");
      res.send({ posts, message: "Aquí tienes todos los posts" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al traer los posts" });
    }
  },
  async getById(req, res) {
    try {
      const post = await Post.findById(req.params._id);
      res.send(post);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al traer el post por Id" });
    }
  },
  async getByDescription(req, res) {
    try {
      const description = new RegExp(`${req.params.description}`, "i");
      const post = await Post.aggregate([
        {
          $match: {
            description,
          },
        },
      ]);
      res.send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un problema al traer el post por descripción",
      });
    }
  },
  async update(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
      });
      //post.img = req.file.originalname;
      res.status(201).send(post);
    } catch (error) {
      console.error(error);
    }
  },
  async delete(req, res) {
    try {
      await Post.findByIdAndDelete(req.params._id);
      res.send("El post ha sido eleiminado");
    } catch (error) {
      console.error(error);
    }
  },
  async like(req, res) {
    try {
      const existPost = await Post.findById(req.params._id);
      if (!existPost.likes.includes(req.user._id)) {
        const post = await Post.findByIdAndUpdate(
          req.params._id,
          { $push: { likes: req.user._id } },
          { new: true }
        );
        await User.findByIdAndUpdate(
          req.user._id,
          { $push: { favorites: req.params._id } },
          { new: true }
        );
        res.send(post);
      } else {
        res.status(400).send({ message: "No se puede dar like otra vez" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema a la hora de darle al like" });
    }
  },
  async dislike(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        { $pull: { likes: req.user._id } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { favorites: req.params._id } },
        { new: true }
      );
      res.send(post);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({
          message: "Ha habido un problema a la hora de darle al dislike",
        });
    }
  },
};

module.exports = PostController;