const express = require('express');
const router = express.Router();


// @route   GET api/auth
// @desc    test route
// @access  Public
// localhost:5000/api/users/
router.get('/', (req, res) => {
    res.send('Auth route');
});

module.exports = router;