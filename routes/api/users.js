const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
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
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // if there are errors
            return res.status(400).json({ errors: errors.array() })
        }

        // see if user exists
        // get users gravatar
        // encrypt password
        // return jsonwebtoken
        
        res.send('User route');
    });

module.exports = router;