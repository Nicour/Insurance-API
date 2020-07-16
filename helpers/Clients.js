'use strict';

const axios = require('axios');
const moment = require('moment');

const axiosForClients = () => (req, res, next) => {
  const token = res.locals.token;
  axios.get('https://dare-nodejs-assessment.herokuapp.com/api/clients', { 
    headers: { 
      Authorization: `Bearer ${token}` 
    } 
  })
  .then((response) => {
    res.send(response.data);
  })
  .catch((err) => {
    next(err);
  })
};

const getClients = () => async (req, res, next) => {
  const expiresAt = res.locals.expiresAt;
  const now = moment().format();
  if(now < expiresAt) {
    axiosForClients();
  } else {
    await login();
    axiosForClients();
  }
};

module.exports = {
  getClients: getClients,
  axiosForClients: axiosForClients
};

