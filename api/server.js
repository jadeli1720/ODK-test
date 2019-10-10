const express = require('express');
const server = express();
const usersRouter = require('../routers/users');
const xmlparser = require("express-xml-bodyparser");

require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(xmlparser());
server.use(helmet());
server.use(cors());

server.use('/users', usersRouter);
server.get('/', (req, res) => {
    res.status(200).json('Server is up :)');
});

module.exports = server;