const { User } = require('../models')

const userData = [
    {
        username: 'yurippe',
        password: 'dnklksnfldl'
    },
    {
        username: 'naonyan',
        password: 'nokskndvonsoi'
    },
    {
        username: 'kyochan',
        password: 'kdmaklfdmvla'
    }
]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
