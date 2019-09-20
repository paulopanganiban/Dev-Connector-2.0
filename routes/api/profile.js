const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/profile');
const User = require('../../models/user');
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user',
            [
                'name', 'avatar'
            ]);
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        // if await profile resolves
        res.json(profile);
    } catch (error) {
    }
});
router.post('/', [auth,
    [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills is required').not().isEmpty()
    ]
], async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        // destructure
        const { company, website, location, bio, status,
            githubusername, skills, youtube, facebook, twitter, instagram, linkedin } = req.body;
        // build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        // turn skills to array
        if (skills) { profileFields.skills = skills.split(',').map(skill => skill.trim()) };
        // build social object
        profileFields.social = {}
        if (youtube) profileFields.social.youtube = youtube;
        if (facebook) profileFields.social.facebook = facebook;
        if (twitter) profileFields.social.twitter = twitter;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        let profile = await Profile.findOne({ user: req.user.id })
        if (profile) {
            // update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true });
            return res.json(profile);
        }
        // if not found
        // create
        profile = new Profile(profileFields);
        // save sa database
        await profile.save();
        // return sa postman
        return res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route   GEt api/profile
// @desc    Get all profiles
// @access  Public
// localhost:5000/api/users method 
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
// @route   GEt api/profile/user/:user_id
// @desc    Get all user profile
// @access  public
// localhost:5000/api/users method 
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ msg: 'Profile not Found' });
        }

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        if (error.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not Found' });
        }
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/profile/
// @desc       delete profile, user, post
// @access  private
// localhost:5000/api/users method 
router.delete('/', auth, async (req, res) => {
    try {
        // @todo remove users posts

        // since database tayo need natin lagi ipasa object sa mongoose methods?
        // hingin natin yung req.body user id 
        // kinuha niya sa req.user.id dahil sa auth nirereturn user id
        await Profile.findOneAndRemove({ user: req.user.id });
        // delete user
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User deleted' });
    } catch (error) {
        console.error(error.message);
        // refactor to global exception handler
        res.status(500).send('Server error');

    }
});

// @route   PUT api/profile/experience
// @desc       add profile experience
// @access  private
// localhost:5000/api/users method 
router.put('/experience', [auth,
    [
        check('title', 'Title is required').not().isEmpty(),
        check('company', 'Company is required').not().isEmpty(),
        check('from', 'From date is required').not().isEmpty(),

    ]
], async (req, res) => {
    // grab the erros
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    // destructure
    const { title, company, location, from, to, current, description } = req.body;
    const newExp = {
        // object for user submitted data
        title, company, location, from, to, current, description
    }
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience.unshift(newExp);
        await profile.save();
        // res.json(profile);
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        // refactor to global exception handler
        res.status(500).send('Server error');

    }
});

// @route   DELETE api/profile/experience/:exp_id
// @desc    delete experience from profile
// @access  private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        // grab profile of the user
        const profile = await Profile.findOne({ user: req.user.id });
        // get the index based on req.params
        const removeIndex = profile.experience.map(item => item.id)
            .indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        // refactor to global exception handler
        res.status(500).send('Server error');
    }
})

/// education

// @route   PUT api/profile/education
// @desc       add profile education
// @access  private
// localhost:5000/api/users method 
router.put('/education', [auth,
    [
        check('school', 'school is required').not().isEmpty(),
        check('degree', 'degree is required').not().isEmpty(),
        check('fieldofstudy', 'fieldofstudy date is required').not().isEmpty(),
        check('from', 'From date is required').not().isEmpty(),

    ]
], async (req, res) => {
    // grab the erros
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    // destructure
    const { school, degree, fieldofstudy, from, to, current, description } = req.body;
    const newEdu = {
        // object for user submitted data
        school, degree, fieldofstudy, from, to, current, description
    }
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // unshift is to put sa taas.
        profile.education.unshift(newEdu);
        await profile.save();
        // res.json(profile);
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        // refactor to global exception handler
        res.status(500).send('Server error');

    }
});


// @route   DELETE api/profile/education/:edu_id
// @desc    delete education from profile
// @access  private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        // grab profile of the user
        const profile = await Profile.findOne({ user: req.user.id });
        // get the index based on req.params
        const removeIndex = profile.education.map(item => item.id)
            .indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        // refactor to global exception handler
        res.status(500).send('Server error');
    }
})


// @route   GET  api/profile/github/:username
// @desc    GET user repos from ghithub
// @access  public

router.get('/github/:username', async (req, res) => {
try {
    const options = {
        // uri: `https://api.github.com/users/${req.params.username}
        // /repos?per_page=5&
        // sort=created:asc&client_id=${config.get('githubClientId')}
        // &client_secret=${config.get('githubSecret')}
        // `,
        uri: `https://api.github.com/users/paulopanganiban/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
        // uri: 'https://api.github.com/users/paulopanganiban/repos?per_page=5&sort=created:asc&client_id=459884810eb27210bca5&client_secret=52dcc660c9722c3faf2ef07a67eedbeff6dd9a4f',
        method: 'GET',
        headers: { 'user-agent': 'node.js' }
    };
    request(options, (error, response, body) => {
        if(error) console.error(error);
        if(response.statusCode !== 200) {
            res.status(404).json({msg: 'No github profile found'});
        }
        res.json(JSON.parse(body));
    })
} catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
}
})

module.exports = router;