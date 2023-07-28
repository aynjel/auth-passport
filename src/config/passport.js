const passport = require("passport");
const User = require("../database/schema/user");

const passportConfig = () => {
    passport.serializeUser((user, done) => {
        console.log("serializeUser");
        process.nextTick(function() {
            done(null, {
                id: user.id,
                email: user.email,
                name: user.name
            });
        });
    });

    passport.deserializeUser((user, done) => {
        console.log("deserializeUser");
        process.nextTick(function () {
            done(null, {
                id: user.id,
                email: user.email,
                name: user.name
            });
        });
    })
}

module.exports = passportConfig;
