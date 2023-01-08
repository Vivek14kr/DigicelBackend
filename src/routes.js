const express = require('express');
const authRoutes = require('./api/auth');
const quizRoutes = require('./api/quizzes');
const userRoutes = require('./api/users');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/quizzes', quizRoutes);
router.use('/users', userRoutes);

module.exports = router;
