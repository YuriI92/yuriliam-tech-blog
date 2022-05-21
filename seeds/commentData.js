const { Comment } = require('../models');

const commentData = [
    {
        comment: 'Pivot creativity requires you to murder your children, at the end of the day, so synergestic actionables big data.',
        user_id: 2,
        post_id: 1
    },
    {
        comment: 'Deep dive flesh that out nor offline this discussion so value-added, and can you put it on my calendar?',
        user_id: 3,
        post_id: 1
    },
    {
        comment: 'they have downloaded gmail and seems to be working for now so please submit the sop and uat files by next monday so ladder up / ladder back to the strategy good optics for design thinking yet synergize productive mindfulness.',
        user_id: 1,
        post_id: 2
    }
]

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
