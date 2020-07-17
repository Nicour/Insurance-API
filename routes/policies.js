'use strict';

const express = require('express');
const router = express.Router();
const axios = require('axios');

const { getPolicies } = require('../functions/Policies');

router.get('/', async (req, res, next) => {
  try {
    getPolicies();
  } catch (error) {
    next(error);
  }
});

module.exports = router;