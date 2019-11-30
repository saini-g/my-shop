const express = require('express');

const authController = require('../../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.get('/reset-password', authController.getResetLink);
router.post('/reset-password', authController.postResetLink);
router.get('/reset-password/:token', authController.getResetForm);
router.post('/new-password', authController.postResetForm);

module.exports = router;