var express = require("express");
var router = express.Router();

const {
  getUser,
  getUsers,
  postUser,
  patchUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/users", getUsers);

router.get("/users/:userId", getUser);

router.post("/users", postUser);

router.patch("/users/:userId", patchUser);

router.patch("/users/:userId", deleteUser);

module.exports = router;
