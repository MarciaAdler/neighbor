const db = require("../models");
var fs = require("fs");

module.exports = {
  createUser: function (req, res) {
    db.User.create({
      firstName: req.body.firstName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      city: req.body.city,
      state: req.body.state,
      image: req.body.image,
    })
      .then(function () {
        res.json(req.body);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  findOne: function (req, res) {
    db.User.findOne({
      where: {
        username: req.body.username,
      },
    })
      .then(function (user) {
        res.json(user);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  createPost: function (req, res) {
    console.log(req.body);
    db.FeedPost.create({
      post: req.body.post,
      UserId: req.body.UserId,
      image1: req.body.image1,
    })
      .then(function () {
        res.json(req.body);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getPosts: function (req, res) {
    db.FeedPost.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.User,
          as: "User",
        },
      ],
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  deletePost: function (req, res) {
    db.FeedPost.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  updateProfile: function (req, res) {
    console.log(req.body);
    db.User.update(
      {
        username: req.body.username,
        email: req.body.email,
        city: req.body.city,
        state: req.body.state,
        firstName: req.body.firstName,
        image: req.body.image,
        bio: req.body.bio,
      },
      {
        where: { id: req.body.id },
      }
    )
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  refreshCurrentUser: function (req, res) {
    db.User.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  findUser: function (req, res) {
    db.User.findOne({
      where: {
        username: req.params.username,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getUserPosts: function (req, res) {
    db.FeedPost.findAll({
      where: {
        UserId: req.params.id,
      },
      order: [["createdAt", "DESC"]],
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  addComment: function (req, res) {
    db.FeedPostComment.create({
      comment: req.body.comment,
      PostId: req.body.PostId,
      CommenterId: req.body.CommenterId,
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getComments: function (req, res) {
    db.FeedPostComment.findAll({
      where: {
        PostId: req.params.id,
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.User,
          as: "Commenter",
        },
      ],
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getComments2: function (req, res) {
    db.FeedPostComment.findAll({
      where: {
        PostId: req.params.id,
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.User,
          as: "Commenter",
        },
      ],
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  deleteComment: function (req, res) {
    db.FeedPostComment.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  createGroup: function (req, res) {
    db.NeighborGroup.create({
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      AdminId: req.body.AdminId,
    })
      .then(function () {
        res.json(req.body);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  setGroups: function (req, res) {
    db.NeighborGroup.findAll({
      include: [
        {
          model: db.User,
          as: "Admin",
        },
      ],
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getPage: function (req, res) {
    const name = req.params.name.replace(/%20/g, " ");
    db.NeighborGroup.findOne({
      where: {
        name: name,
      },
      include: [
        {
          model: db.User,
          as: "Admin",
        },
      ],
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  createGroupPost: function (req, res) {
    db.GroupPost.create({
      post: req.body.post,
      UserId: req.body.UserId,
      image1: req.body.image1,
      GroupId: req.body.GroupId,
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getGroupPosts: function (req, res) {
    console.log(req.params);
    db.GroupPost.findAll({
      where: { GroupId: req.params.group },
      order: [["createdAt", "DESC"]],

      include: [
        {
          model: db.User,
          as: "User",
        },
      ],
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  deleteGroupPost: function (req, res) {
    db.GroupPost.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  addGroupComment: function (req, res) {
    db.GroupPostComment.create({
      comment: req.body.comment,
      PostId: req.body.PostId,
      CommenterId: req.body.CommenterId,
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  getGroupComments: function (req, res) {
    db.GroupPostComment.findAll({
      where: { PostId: req.params.id },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.User,
          as: "Commenter",
        },
      ],
    })
      .then((dbModel) => res.json(dbModel))
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
};
