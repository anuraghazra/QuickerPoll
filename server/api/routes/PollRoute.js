const express = require('express');
const PollRoute = express.Router();
const PollModel = require('../../models/PollModel');

// GET all polls
PollRoute.get('/', (req, res) => {
  PollModel.find()
    .then(data => {
      const response = {
        count: data.length,
        polls: data.map(mapped => {
          return {
            name: mapped.name,
            votes: mapped.votes,
            _id: mapped._id,
            request: {
              type: 'GET',
              url: `http://localhost:5000/api/polls/${mapped._id}`
            }
          };
        })
      };
      res.send(response);
    })
    .catch(err => {
      console.log('Something went wrong when fetching the data ', err);
      res.status(code).json({ error: err });
    });
});

// GET single poll
PollRoute.get('/:poll_id', (req, res) => {
  PollModel.findById({ _id: req.params.poll_id })
    .then(data => {
      const response = {
        name: data.name,
        votes: data.votes,
        _id: req.params.poll_id,
        request: {
          type: 'GET',
          url: `http://localhost:5000/api/polls`
        }
      };
      res.send(response);
    })
    .catch(err => {
      console.log('Something went wrong when fetching the data ', err);
      res.status(404).json({ error: err });
    });
});

// POST create new poll
PollRoute.post('/', (req, res) => {
  console.log(req.body);
  PollModel.create(req.body)
    .then(data => {
      const response = {
        name: data.name,
        votes: data.votes,
        request: {
          type: 'GET',
          url: `http://localhost:5000/api/polls/${data._id}`
        }
      };
      res.send(response);
    })
    .catch(err => {
      console.log('Something went wrong creating new poll', err);
      res.send(err);
    });
});

// PATCH update poll values
PollRoute.patch('/:poll_id', (req, res) => {
  const poll_id = req.params.poll_id;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  // [{ propName : votes[name], value : 1 }]
  PollModel.update({ _id: poll_id }, { $set: updateOps })
    .then(data => {
      res.send({
        message: 'Poll has been updated!',
        request: {
          type: 'GET',
          url: `http://localhost:5000/api/polls/${poll_id}`
        }
      });
    })
    .catch(err => {
      console.log('Something went wrong when casting votes');
      res.status(501).json({ erro: err });
    });
});

// Cast Votes
PollRoute.patch('/cast/:poll_id', (req, res) => {
  const poll_id = req.params.poll_id;
  const vote_id = req.body.vote_id;
  PollModel.findOneAndUpdate(
    { _id: poll_id, 'votes._id': vote_id },
    {
      $inc: { 'votes.$.value': 10 }
    }
  )
    .then(result => {
      res.send({
        ...result._doc,
        message: 'Thanks for voting!',
        request: {
          type: 'GET',
          url: `http://localhost:5000/api/polls/${poll_id}`
        }
      });
    })
    .catch(err => {
      res.status(501).json({ error: err });
    });
});

PollRoute.delete('/:poll_id', (req, res) => {
  const poll_id = req.params.poll_id;
  PollModel.findByIdAndRemove(poll_id)
    .then(() => {
      res.send({
        message: 'Successfully deleted the poll',
        request: {
          type: 'GET',
          url: `http://localhost:5000/api/polls`
        }
      });
    })
    .catch(err => {
      console.log('Something went wrong when deleting the poll');
      res.status(501).json({ erro: err });
    });
});

module.exports = PollRoute;
