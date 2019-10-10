const express = require('express');
const server = express();
const usersRouter = require('../routers/users');

require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/users', usersRouter);
server.get('/', (req, res) => {
    res.status(200).json('Server is up :)');
});

module.exports = server;