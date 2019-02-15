
const mongoose = require('mongoose');

module.exports = (function () {
  const options = {
    useNewUrlParser: true,
    auth: { user: 'anuraghazra', password: 'gshock@@@@@12345' }
  }
  mongoose.connect('mongodb://<user>:<password>@ds227255.mlab.com:27255/quickpoll', options)
  .then(() => {
    console.log('Connected to mlab')
  })
  .catch((err) => {
    console.error('can\'t connect to mlab - \n' + err)
  });
})();
