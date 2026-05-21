const express = require('express');
const { signup, signin, signout, verifyEmail, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middlewares/protect.middleware');

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.post('/signout', signout);
authRouter.get("/me", protect, getMe);
authRouter.get('/verify-email', verifyEmail);

module.exports = authRouter;