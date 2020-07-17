'use strict';

const axios = require('axios');
const moment = require('moment');

const login = () => (req, res, next) => {
  const client = { 
    client_id: "axa", 
    client_secret: "s3cr3t" 
  };
  axios.post('https://dare-nodejs-assessment.herokuapp.com/api/login', client)
  .then((response) => {
    res.locals = {
      token: response.data.token,
      createdAt: moment(response.headers.date).format(),
      expiresAt: moment().add(5, 'm').format()
    };
    next();
  })
  .catch((err) => {
    next(err);
  });
};

module.exports = login;

