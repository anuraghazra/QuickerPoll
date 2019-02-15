const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 5000;

// connect to db
require('./helpers/dbConnect');

const server = http.createServer(app);
server.listen(PORT);