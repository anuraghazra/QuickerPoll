const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/*
function dotify(obj: object) {
  const res = {};
  function recurse(obj: object, current?: string) {
    for (const key in obj) {
      const value = obj[key];
      const newKey = (current ? current + '.' + key : key);
      if (value && typeof value === 'object') {
        recurse(value, newKey);
      } else {
        res[newKey] = value;
      }
    }
  }
  recurse(obj);
  return res;
}
*/
var notEmpty = function (data) {
  if (data.length <= 1) {
    return false
  } else {
    return true;
  }
}

const Vote = new Schema({
  name: String,
  value: Number,
  color: String
})
const PollModel = new Schema({
  name: { type: String, required: true },
  votes: { type: [Vote], required: true, default: undefined, validate: [notEmpty, 'Please add at least 2 vote in the vote poll'] },
});

// mongoose.model(collectionName, Schema)
module.exports = mongoose.model('polls', PollModel);