const express = require('express');
const { signup, signin, signout, verifyEmail, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middlewares/protect.middleware');
const { authLimiter } = require('../config/rateLimit.config');

const authRouter = express.Router();

// authLimiter counts only failed responses, so legitimate users are never
// blocked; credential-stuffing bots hit the wall after 10 failures / 15 min.
authRouter.post('/signup', authLimiter, signup);
authRouter.post('/signin', authLimiter, signin);
authRouter.post('/signout', signout);
authRouter.get("/me", protect, getMe);
authRouter.get('/verify-email', verifyEmail);

module.exports = authRouter;