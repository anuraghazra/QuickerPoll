const http = require('http');
const app = require('./app');
const socketIO = require('socket.io');

require('dotenv').config();

const PORT = process.env.PORT || 5000;

// connect to db
require('./helpers/dbConnect');

const server = http.createServer(app);

const io = socketIO(server);
io.on("connection", client => {
  client.on('update:client', () => {
    client.broadcast.emit('update:server', true);
  })
  client.on("disconnect", () => console.log("Client disconnected"));
});


server.listen(PORT, () => {
  console.log('Server Listining on port ' + PORT);
});