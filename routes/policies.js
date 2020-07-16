'use strict';

const express = require('express');
const router = express.Router();
const axios = require('axios');

const helpers = require('../helpers/Middlewares');

router.get('/', async (req, res, next) => {
  try {
    let token = res.locals.token;
    if(token) {
      helpers.getPolicies();
    } else {
      helpers.login();
      helpers.getPolicies();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;