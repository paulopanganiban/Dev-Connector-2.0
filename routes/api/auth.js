const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');

// @route   GET api/auth
// @desc    test route
// @access  Public
// localhost:5000/api/users/
router.get('/', auth, async (req, res) => {
    try {
     const user = await User.findById(req.user.id).select('-password');
     res.json(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // if there are errors
            return res.status(400).json({ errors: errors.array() })
        }
        // destructuring
        // pull stuff out
        const { email, password } = req.body;
        try {
            // grab user
            let user = await User.findOne({
                // from req.body yang email
                email: email
            });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
            }
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
            }

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
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