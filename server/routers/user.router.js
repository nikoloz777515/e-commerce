const express = require("express");
const upload = require("../config/upload.config");
const { protect, allowedTo } = require('../middlewares/protect.middleware');
const { getUserById, updateUserById, deleteUserById, getUsers,updateUserRole } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.patch("/:id/role", protect, allowedTo("admin"), updateUserRole);
userRouter.route("/:id").get(getUserById).patch(protect, upload.single("avatar"), updateUserById)
.delete(protect, allowedTo("admin"), deleteUserById);
userRouter.get("/", getUsers);

module.exports = userRouter;