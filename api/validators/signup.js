const { check, body } = require('express-validator');

const User = require('../../models/user');

module.exports = [
    check('email').isEmail().withMessage('Invalid email address.')
        .custom((value) => {

            return User.findOne({ email: value })
                .then(userDoc => {

                    if (userDoc) {
                        return Promise.reject('User with email already exists.');
                    }
                });
        }),
    body('password', 'Password must be atleast 5 characters and alphanumeric')
        .isLength({ min: 5 })
        .isAlphanumeric(),
    body('confirmPassword')
        .custom((value, { req, location, path }) => {

            if (value !== req.body.password) {
                throw new Error('Passwords do not match.');
            }
            return true;
        })
];