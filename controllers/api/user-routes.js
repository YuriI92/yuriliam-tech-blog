const router = require('express').Router();
const { User } = require('../../models');

// url: /api/users

// get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: ['id', 'username']
    })
        .then(users => res.json(users))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create user to sign up
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(user => res.json(user))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// find user and let user login if password matches
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            // if the user not found, respond with 404
            if (!user) {
                res.status(404).json({ message: 'No user found with this username' });
                return;
            }

            // check password
            const validPassword = user.checkPassword(req.body.password);
            // if the password is not valid, respond with 404
            if (!validPassword) {
                res.status(404).json({ message: 'Password is incorrect.' });
                return;
            }

            res.json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
