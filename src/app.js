const express = require('express');
const rateLimit = require('express-rate-limit');
const path = require('path');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const tasksRouter = require('./routes/task.route');
const usersRouter = require('./routes/user.route');

const app = express();

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes : to be updated ! for prod
  max: 1000,
  // store: new MongoStore({
  // uri: 'mongodb://127.0.0.1:27017/test_db',
  // user: 'mongouser',
  // password: 'mongopassword',
  // should match windowMs
  // expireTimeMs: 15 * 60 * 1000,
  // errorHandler: console.error.bind(null, 'rate-limit-mongo'),
  // see Configuration section for more options and details
  // }),
});

app.use(limiter);

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.static(`${__dirname}/public`));
app.get('/', (req, res) => res.sendFile(path.join(`${__dirname}/index.html`)));

// v1 api routes
app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);

// app.use('/v1/patients', limiterPatientSearching);

module.exports = app;
