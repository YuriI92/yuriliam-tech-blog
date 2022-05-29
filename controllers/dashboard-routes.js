const router = require('express').Router();
const { User, Post } = require('../models');
const { auth, sessTimeout } = require('../utils/authentication');

// get the user's posts and render info to dashboard handlebars
router.get('/', auth, sessTimeout, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'title', 'created_at']
    })
        .then(postData => {
            const posts = postData.map((post) => post.get({ plain: true }));
            res.render('dashboard', { 
                posts,
                dashboard: true,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// when add post is clicked, render info to new-post handlebars
router.get('/new', auth, sessTimeout, (req, res) => {
    res.render('new-post', {
        dashboard: true,
        loggedIn: req.session.loggedIn,
        session_userId: req.session.user_id
    });
});

// when the post title in dashboard is clicked, render info to edit-post handlebar
router.get('/edit/:id', auth, sessTimeout, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'contents']
    })
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            
            const post = postData.get({ plain: true });
            
            res.render('edit-post', {
                post,
                dashboard: true,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
