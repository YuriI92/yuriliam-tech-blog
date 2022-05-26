const auth = (req, res, next) => {
    if (!req.session.loggedIn) {
        window.location.replace('/login');
    } else {
        next();
    }
}

const sessTimeout = async (req, res, next) => {
    if (!req.session.cookie.expires) {
        req.session.destroy(() => {
            res.redirect('/');
        });
    } else {
        next();
    }
}

module.exports = { auth, sessTimeout };
