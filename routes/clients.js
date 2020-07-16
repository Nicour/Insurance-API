'use strict';

const express = require('express');
const router = express.Router();
const axios = require('axios');

const clients = require('../helpers/Clients');

router.get('/', async (req, res, next) => {
  try {
    clients.getClients();
  } catch (error) {
    next(error);
  }
});

module.exports = router;