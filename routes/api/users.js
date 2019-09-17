const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// Init Middleware
// to get the req.body 
// @route   POST api/users
// @desc    Register user
// @access  Public
// localhost:5000/api/users method
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password').isLength({
        min: 6
    })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // if there are errors
            return res.status(400).json({ errors: errors.array() })
        }
        // destructuring
        // pull stuff out
        const { name, email, password } = req.body;
        try {
            // grab user
            let user = await User.findOne({
                // from req.body yang email
                email: email
            })
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })
            user = new User({
                name,
                email,
                avatar,
                password
            })
            // encrypt password
            // create salt
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            // return jsonwebtoken
            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token })
                });

        } catch (err) {
            console.error(error);
            res.status(500).send('Server error');
        }
    });

module.exports = router;