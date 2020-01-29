const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan')

module.exports = server => {
  server.use(helmet());
  server.use(morgan('short'));
  server.use(cors({
    origin: "*",
    methods: "GET, PUT, POST, DELETE",
    preflightContinue: false
  }));
  server.use(express.json());
}