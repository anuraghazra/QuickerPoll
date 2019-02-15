const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('./helpers/cors');
const PollRoute = require('./api/routes/PollRoute');
const app = express();


// middlewares
app.use(cors);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/api/polls', PollRoute);

// error handling
app.use((req, res, next) => {
  const error = new Error('404 not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: error.message
  })
});


module.exports = app;