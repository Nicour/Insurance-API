'use strict';

const express = require('express');
const router = express.Router();
const axios = require('axios');

const { getClients } = require('../functions/Clients');

router.get('/', async (req, res, next) => {
  try {
    getClients();
  } catch (error) {
    next(error);
  }
});

module.exports = router;