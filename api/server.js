const express = require('express');
const middleware = require('../middleware');

const server = express();

middleware(server);

server.use('/', (req, res, next) => {
  res.status(200).json({ message: 'Welcome to Gigapet!' })
})

module.exports = server;