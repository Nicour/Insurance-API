'use strict';

const express = require('express');
const router = express.Router();
const axios = require('axios');

const policies = require('../helpers/Policies');

router.get('/', async (req, res, next) => {
  try {
    policies.getPolicies();
  } catch (error) {
    next(error);
  }
});

module.exports = router;