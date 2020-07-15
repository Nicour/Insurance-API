const express = require('express');
const router = express.Router();
const axios = require('axios');

const helpers = require('../helper/Auth')

router.get('/', async (req, res, next) => {
  try {
    let token = res.locals.token;
    if(token) {
      helpers.getClientsOrPolicies();
    } else {
      helpers.login();
      helpers.getClientsOrPolicies();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;