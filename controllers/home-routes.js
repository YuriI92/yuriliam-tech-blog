const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const { sessTimeout } = require('../utils/authentication');

// get all the posts and render info to home handlebars
router.get('/', sessTimeout, (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'contents', 'user_id', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(postData => {
            // get plain js object
            const posts = postData.map((post) => post.get({ plain: true }));
            res.render('home', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// when login is clicked, go to login page
router.get('/login', (req, res) => {
    // if already logged in redirect to the home
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// when instead signup is clicked, go to signup
router.get('/signup', (req, res) => {
    res.render('signup');
});

// when a post is clicked, render info to single-post handlebars
router.get('/post/:id', sessTimeout, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'contents', 'user_id', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['comment', 'created_at'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        ]
    })
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            const post = postData.get({ plain: true });
            console.log(post);

            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn,
                session_userId: req.session.user_id
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
