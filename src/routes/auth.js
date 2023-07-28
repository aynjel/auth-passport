const { Router } = require('express');
const passport = require('passport');

const router = Router();

router.get('/', (req, res) => {
    if (req.user) {
        res.send(req.user);
    } else {
        res.send("Not logged in");
    }
});

router.get('/discord', passport.authenticate('discord', {
    scope: ['identify', 'email']
}));

router.get('/discord/callback', passport.authenticate('discord', {
    successRedirect: '/auth',
    failureRedirect: '/auth/login',
    session: true
}));

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/auth',
    failureRedirect: '/auth/login',
    session: true
}));

router.get('/twitter', passport.authenticate('twitter', {
    scope: ['profile', 'email']
}));

router.get('/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/auth',
    failureRedirect: '/auth/login',
    session: true
}));

router.get('/github', passport.authenticate('github', {
    scope: ['profile', 'email']
}));

router.get('/github/callback', passport.authenticate('github', {
    successRedirect: '/auth',
    failureRedirect: '/auth/login',
    session: true
}));

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) throw err;
        res.redirect('http://localhost:4000/auth');
    });
});

module.exports = router;