
const mongoose = require('mongoose');
const URI = require('../config/index');

module.exports = (function () {
  console.log(URI)
  mongoose.connect(URI, { useNewUrlParser: true })
    .then(() => {
      console.log('Connected to mlab')
    })
    .catch((err) => {
      console.error('can\'t connect to mlab - \n' + err)
    });
})();
