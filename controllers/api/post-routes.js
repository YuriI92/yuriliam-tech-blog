const router = require('express').Router();
const { User, Post } = require('../../models');

// requesting /api/posts

// get all posts
router.get('/', (req, res) => {
    
});

// get single post
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'contents', 'user_id', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(post => {
            if (!post) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create post
router.post('/', (req, res) => {
    Post.create(req.body)
        .then(post => res.json(post))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// edit post
router.put('/:id', (req, res) => {
    Post.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(post => {
            if (!post) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// delete post
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(post => {
            if (!post) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
