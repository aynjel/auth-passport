require('dotenv').config();

const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
// const cors = require('cors');
const passport = require('passport');
const createError = require('http-errors');
const mongoStore = require('connect-mongo');
const ejs = require('ejs');
const engine = require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override');
// const moment = require('moment');
const passportConfig = require('./config/passport');
const discordStrategy = require('./strategies/discord');
const googleStrategy = require('./strategies/google');
const twitterStrategy = require('./strategies/twitter');
const githubStrategy = require('./strategies/github');

const app = express();
const PORT = process.env.PORT || 4000;

const connect = require('./database/db');
connect(process.env.MONGO_URI);

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true
// }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        sameSite: 'none',
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: mongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}));
app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());

passportConfig();

discordStrategy();
googleStrategy();
twitterStrategy();
githubStrategy();

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/auth', require('./routes/auth'));

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV === `development` ? err : {};

    res.status(err.status || 500);
    res.render('error', { url: req.url });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));