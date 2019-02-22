
const mongoose = require('mongoose');

module.exports = (function () {
  const MONGO_URI = process.env.MONGODB_URI;
  mongoose.connect(MONGO_URI, { useNewUrlParser: true })
    .then(() => {
      console.log('Connected to mlab')
    })
    .catch((err) => {
      console.error('can\'t connect to mlab - \n' + err)
    });
})();
