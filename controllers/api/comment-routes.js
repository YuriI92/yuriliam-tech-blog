const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// requesting /api/comments

// get all comments
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: ['id', 'comment', 'user_id', 'post_id', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Post,
                attributes: ['title', 'user_id'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        ]
    })
        .then(comments => res.json(comments))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create comment
router.post('/', (req, res) => {
    Comment.create(req.body)
        .then(comment => {
            console.log(comment);
            res.json(comment)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
