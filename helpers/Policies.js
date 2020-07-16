'use strict';

const axios = require('axios');
const moment = require('moment');

const axiosForPolicies = () => (req, res, next) => {
  const token = res.locals.token;
  axios.get('https://dare-nodejs-assessment.herokuapp.com/api/policies', { 
    headers: { 
      Authorization: `Bearer ${token}` 
    } 
  })
  .then((response) => {
    res.send(response.data);
  })
  .catch((err) => {
    res.send(err);
  })
};

const getPolicies = () => (req, res, next) => {
  const expiresAt = res.locals.expiresAt;
  const now = moment().format();
  if(now < expiresAt) {
    axiosForPolicies();
  } else {
    login();
    axiosForPolicies();
  }
};

module.exports = {
  getPolicies: getPolicies,
  axiosForPolicies: axiosForPolicies
};

