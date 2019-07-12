const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const PollRoute = require('./api/routes/PollRoute');
const app = express();
const path = require('path');

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, '../client/build')));
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname + '../client/build/index.html'));
// });

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/api/polls', PollRoute);

// Server Side Routing
// If no API routes are hit, send the React app
app.use(express.static('client/build'));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

// const router = express.Router();
// app.get('/*', function(req, res) {
// 	res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

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