// Modules
const express = require("express");

// Configs
const upload = require("../config/upload.config");

// Middlewares
const { protect, allowedTo } = require('../middlewares/protect.middleware');
const validate = require("../middlewares/validate.middleware");

// Controllers
const { getUserById, updateUserById, deleteUserById, getUsers,updateUserRole } = require("../controllers/user.controller");

// Validation
const { updateUserSchema, updateUserRoleSchema } = require("../validations/user.validation");

const userRouter = express.Router();

userRouter.patch("/:id/role", protect, allowedTo("admin"), validate(updateUserRoleSchema), updateUserRole);
userRouter.route("/:id")
    .get(getUserById)
    .patch(protect, upload.single("avatar"), validate(updateUserSchema), updateUserById)
    .delete(protect, allowedTo("admin"), deleteUserById);
userRouter.get("/", getUsers);

module.exports = userRouter;