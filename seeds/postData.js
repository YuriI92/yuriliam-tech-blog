const { Post } = require('../models');

const postData = [
    {
        title: 'express-session',
        contents: 'This is a Node.js module available through the npm registry.',
        user_id: 1
    },
    {
        title: 'Sequelize v5 was released',
        contents: 'Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.',
        user_id: 1
    },
    {
        title: 'Express 5.0 beta documentation is now available.',
        contents: 'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
        user_id: 2
    }
]

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
