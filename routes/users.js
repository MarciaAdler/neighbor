const router = require("express").Router();
const passport = require("../config/passport");
const usersController = require("../controllers/usersController");
const db = require("../models");

router.route("/api/signup").post(usersController.createUser);

router.post(
  "/api/login",
  passport.authenticate("local"),
  usersController.findOne
);

router.route("/api/post").post(usersController.createPost);

router.route("/api/post").get(usersController.getPosts);

router.route("/api/deletepost/:id").delete(usersController.deletePost);

router.route("/api/updateprofile").put(usersController.updateProfile);

router.route("/api/user/:id").get(usersController.refreshCurrentUser);

router.route("/api/viewprofile/:username").get(usersController.findUser);

router.route("/api/userposts/:id").get(usersController.getUserPosts);

router.route("/api/addcomment").post(usersController.addComment);

router.route("/api/getcomments/:id").get(usersController.getComments);

router.route("/api/getcomments2/:id").get(usersController.getComments2);

router.route("/api/deletecomment/:id").delete(usersController.deleteComment);

router.route("/api/group").post(usersController.createGroup);

router.route("/api/group").get(usersController.setGroups);

router.route("/api/grouppage/:name").get(usersController.getPage);

router.route("/api/grouppost").post(usersController.createGroupPost);

router.route("/api/grouppost/:group").get(usersController.getGroupPosts);

router
  .route("/api/deletegrouppost/:id")
  .delete(usersController.deleteGroupPost);

router.route("/api/addgroupcomment").post(usersController.addGroupComment);

router.route("/api/getgroupcomments/:id").get(usersController.getGroupComments);

router
  .route("/api/deletegroupcomment/:id")
  .delete(usersController.deleteGroupComment);

router.route("/api/updategroup").put(usersController.updateGroup);

router.route("/api/group/:group").get(usersController.refreshGroup);

router.route("/api/groupimage").put(usersController.updateImageName);

router.route("/api/userimage").put(usersController.updateProfileImageName);

router.route("/api/getusers").get(usersController.getUsers);

router.route("/api/writemessage").post(usersController.writeMessage);

router
  .route("/api/getchatmessages/:SenderId/:ReceiverId")
  .get(usersController.getMessages);

router.route("/api/doc").post(usersController.createDoc);

router.route("/api/doc").get(usersController.getDocs);

router.route("/api/doc/:id").delete(usersController.deleteDoc);

router.route("/api/countusers").get(usersController.countUsers);

router.route("/api/feedpostcount").get(usersController.feedpostCount);

router.route("/api/uniquefeedposters").get(usersController.uniqueFeedPosters);

router
  .route("/api/uniquefeedpostersinfo/:userid")
  .get(usersController.getUniqueFeedPostersInfo);

router.route("/api/getnewusers").get(usersController.getNewUsers);

router.route("/api/likepost").post(usersController.likePost);

router.route("/api/getuserliked/:userid").get(usersController.getUserLiked);

router.route("/api/getuserlikes/:userid").get(usersController.getUserLiked);

router.route("/api/getalllikes/:postid").get(usersController.getAllLikes);

router
  .route("/api/updatelike/:userid/:postid")
  .delete(usersController.updateLike);

module.exports = router;
