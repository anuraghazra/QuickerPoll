# QuickerPoll
QuickerPoll is a crowd-sourced real-time polling app created with React and Nodejs. QuickerPoll lets you create edit, update, delete public polls and vote on them publicly. This project is just an example of using react, nodejs and restfull apis all together


*NOTE : please do not create any violating contents here as is this database is publicly visible and i'm not responsibe for any violating content*


## API Endpoints: 

### GET - GET POLLS
```js
// GET ALL POLLS
/api/polls -> 
[
  {
    name: String,
    votes: [Object],
    _id: String,
    request: {
      type: 'GET',
      url: `/api/polls/${_id}`
    }
  }
]

// GET SINGLE POLL
/api/polls/:poll_id -> 
{
  name: String,
  votes: [Object],
  _id: String,
  request: {
    type: 'GET',
    url:  `/api/polls/`
  }
}
```


### POST - CREATE POLLS
```js
// PAYLOAD TO SEND
payload = {
  name: String,
  votes: [
    {
      name : String,
      value: Number,
      color: String
    }
  ]
}

/api/polls -> 
{
  name: String,
  votes: [Object],
  request: {
    type: 'GET',
    url: `/api/polls/_id`
  }
}



```

### PATCH - UPDATE POLLS
```js
// PAYLOAD TO SEND
payload = [
  {"propName" : "name", "value" : "new name"},
  {"propName" : "votes.0.value", "value" : "80"},
  ...
]

/api/polls/:poll_id ->
{
  message: 'Poll has been updated!',
  request: {
    type: 'GET',
    url: `/api/polls/_id`
  }
}
```


### PATCH - VOTE POLLS
```js
// PAYLOAD TO SEND
payload = vote_id : String

/api/polls/cast/:poll_id ->
{
  name: String,
  votes: [Object],
  _id: String,
  message: 'Thanks for voting!',
  request: {
    type: 'GET',
    url: `/api/polls/_id`
  }
}
```

### DELETE - DELETE POLL
```js
/api/polls/:poll_id ->
{
  message: 'Successfully deleted the poll',
  request: {
    type: 'GET',
    url: `/api/polls`
  }
}
```

## Get Started

Clone the repo to your local machine
```bash
git clone https://github.com/anuraghazra/QuickerPoll.git
``` 

Install all the dependencies
```bash
npm install
``` 

Start the application on localhost:3000
```bash
npm run dev
``` 


### NPM Commands
start the application
```bash
npm run dev
``` 

start the backend server
```bash
npm start
```

watch for changes in server
```bash
npm run watch-server
```

in the ./clients folder to build react front-end type
```bash
npm run build
```


## Tools Used

* [React](https://reactjs.org)
* [AntDesign](https://ant.design)
* [Nodejs](https://nodejs.org/)
* [Heroku](https://heroku.com/)
* [Express](https://expressjs.com/)
* [Axios](https://github.com/axios/axios)
* [Mongoosejs](https://mongoosejs.com/)
* [mLab](https://mlab.com/)

Made with :heart: and javascript