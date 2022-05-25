const router = require('express').Router();
const { User, Post } = require('../models');

router.get('/', (req, res) => {
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

router.get('/new', (req, res) => {
    res.render('new-post', {
        dashboard: true,
        loggedIn: req.session.loggedIn,
        session_userId: req.session.user_id
    });
});

router.get('/edit/:id', (req, res) => {
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
