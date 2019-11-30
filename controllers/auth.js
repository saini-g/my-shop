const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const User = require('../models/user');
const transporter = require('../util/email-transporter');

const getLogin = (req, res, next) => {
    let message = req.flash('error');

    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        docTitle: 'Login',
        path: 'login',
        errorMessage: message
    });
}

const postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then(userDoc => {

            if (!userDoc) {
                req.flash('error', 'Invalid login credentials.');
                return res.redirect('/login');
            }
            bcrypt.compare(password, userDoc.password)
                .then(isPasswordValid => {

                    if (isPasswordValid) {
                        req.session.user = userDoc;
                        req.session.isLoggedIn = true;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        });
                    }
                    req.flash('error', 'Invalid login credentials.');
                    res.redirect('/login');
                });
        })
        .catch(err => {
            console.log(err);
        });
}

const postLogout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect('/');
    });
}

const getSignup = (req, res, next) => {
    let message = req.flash('error');

    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/signup', {
        docTitle: 'Signup',
        path: 'signup',
        errorMessage: message
    });
}

const postSignup = (req, res, next) => {
    // to avoid duplication - can also use index in mongodb
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (password !== confirmPassword) {
        req.flash('error', 'Passwords do not match.');
        return res.redirect('/signup');
    }
    User.findOne({ email: email })
        .then(userDoc => {

            if (userDoc) {
                req.flash('error', 'User with email already exists.');
                return res.redirect('/signup');
            }
            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const newUser = new User({
                        email: email,
                        password: hashedPassword,
                        cart: { products: [] }
                    });
                    return newUser.save();
                })
                .then(result => {
                    res.redirect('/login');
                    return transporter.sendMail({
                        to: email,
                        from: 'node@test.gs',
                        subject: 'Signup Succesful',
                        html: `<h3>Signup successful for nodejs shop.</h3>`
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
}

const getResetLink = (req, res, next) => {
    let message = req.flash('error');

    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/reset', {
        docTitle: 'Reset Password',
        path: 'reset',
        errorMessage: message
    });
}

const postResetLink = (req, res, next) => {
    
    crypto.randomBytes(32, (err, buffer) => {

        if (err) {
            console.log(err);
            return res.redirect('/reset-password');
        }
        const token = buffer.toString('hex');
        User.findOne({ email: req.body.email })
            .then(user => {

                if (!user) {
                    req.flash('error', 'No user found with the provided email.');
                    return res.redirect('/reset-password');
                }
                user.resetToken = token;
                // token valid for 15 minutes only
                user.resetTokenExpiration = Date.now() + (15 * 60 * 1000);
                return user.save();
            })
            .then(result => {
                res.redirect('/');
                return transporter.sendMail({
                    to: req.body.email,
                    from: 'node@test.gs',
                    subject: 'Reset Password',
                    html: `
                        <p>A password reset link was requested for this email.</p>
                        <p>Click <a href="http://localhost:4000/reset-password/${token}">here</a> to set a new password.</p>
                        <p>This link is valid for 15 minutes only.</p>
                    `
                });
            })
            .catch(err => {
                console.log(err);
            });
        });
}

const getResetForm = (req, res, next) => {
    let message = req.flash('error');
    const token = req.params.token;

    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
        .then(user => {

            if (!user) {
                return res.render('auth/new-password', {
                    docTitle: 'Set New Password',
                    path: 'new-password',
                    errorMessage: message,
                    isLinkValid: false
                });
            }
            res.render('auth/new-password', {
                docTitle: 'Set New Password',
                path: 'new-password',
                errorMessage: message,
                isLinkValid: true,
                userId: user._id.toString(),
                resetToken: token
            });
        })
        .catch(err => {
            console.log(err);
        });
}

const postResetForm = (req, res, next) => {
    const userId = req.body.userId;
    const newPassword = req.body.password;
    const resetToken = req.body.resetToken;
    let user;

    User.findOne({
        _id: userId,
        resetToken: resetToken,
        resetTokenExpiration: { $gt: Date.now() }
    })
        .then(userDoc => {

            if (!userDoc) {
                //
            }
            user = userDoc;
            return bcrypt.hash(newPassword, 12);
        })
        .then(hashedPassword => {
            user.password = hashedPassword;
            user.resetToken = undefined;
            user.resetTokenExpiration = undefined;
            return user.save();
        })
        .then(saveResult => {
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    getLogin,
    postLogin,
    postLogout,
    getSignup,
    postSignup,
    getResetLink,
    postResetLink,
    getResetForm,
    postResetForm
};