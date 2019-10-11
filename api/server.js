const express = require('express');
const server = express();
const usersRouter = require('../routers/users');
const xmlparser = require("express-xml-bodyparser");
const fileupload = require('express-fileupload');

require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(xmlparser());
server.use(helmet());
server.use(cors());
server.use(fileupload({
    useTempFiles: true,
}));

server.use('/users', usersRouter);
server.get('/', (req, res) => {
    res.status(200).json('Server is up :)');
});

module.exports = server;