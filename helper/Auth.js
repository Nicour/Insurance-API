'use strict';

const axios = require('axios');

const login = () => (req, res, next) => {
  const data = { 
    client_id: "axa", 
    client_secret: "s3cr3t" 
  };
  axios.post('https://dare-nodejs-assessment.herokuapp.com/api/login', data)
  .then((response) => {
    const token = response.data.token;
    res.locals.token = token;
    next();
  })
  .catch((err) => {
    return err;
  });
};

const getClientsOrPolicies = () => (req, res, next) => {
  let token = res.locals.token;
  axios.get('https://dare-nodejs-assessment.herokuapp.com/api/clients', { headers: { Authorization: `Bearer ${token}` } })
  .then((response) => {
    res.send(response.data);
  })
  .catch(() => {
    login();
    token = res.locals.token;
    axios.get('https://dare-nodejs-assessment.herokuapp.com/api/clients', { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      res.send(response.data);
    });
  });
};

module.exports = {
  login: login,
  getClientsOrPolicies: getClientsOrPolicies
};

