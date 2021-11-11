const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const cookieSession = require('cookie-session');
const app = express();
const db = require("./db");
// var port = process.env.PORT || '3001';

// const http = require('http')
// var server = http.createServer(app);
// const socketio = require('socket.io');
// const io = socketio(server, {
//   cors: {
//     origin: `http://localhost:${port}`,
//     methods: ["GET", "POST", "PUT", "DELETE"]
//   }
// });


// io.on('connection', (socket) => {
//   console.log('we have a new connection!');

//   socket.on('join', ({ customer_name }) => {
//     console.log(customer_name)
//   })

//   socket.on('disconnect', () => {
//     console.log('User has left!')
//   })
// })

const tripsRouter = require('./routes/trips');
const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');

const dbHelpersUsers = require('./helpers/dbHelpersUsers.js')(db);
const dbHelpersTrips = require('./helpers/dbHelpersTrips.js')(db);
const dbHelpersMessages = require('./helpers/dbHelpersMessages.js')(db);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.use('/users', usersRouter(dbHelpersUsers));
app.use('/trips', tripsRouter(dbHelpersTrips));
app.use('/messages', messagesRouter(dbHelpersMessages));
app.use('/login', usersRouter(dbHelpersUsers));

// server.listen(port, () => console.log(`Socketi.io: Server has started on port ${port}`))

module.exports = app;
