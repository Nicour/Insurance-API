'use strict';

const axios = require('axios');
const moment = require('moment');

const login = () => (req, res, next) => {
  const data = { 
    client_id: "axa", 
    client_secret: "s3cr3t" 
  };
  axios.post('https://dare-nodejs-assessment.herokuapp.com/api/login', data)
  .then((response) => {
    res.locals = {
      token: response.data.token,
      createdAt: moment(response.headers.date).format(),
      expiresAt: moment().add(5, 'm').format()
    };
    next();
  })
  .catch((err) => {
    return err;
  });
};

const getClients = () => (req, res, next) => {
  let token = res.locals.token;
  axios.get('https://dare-nodejs-assessment.herokuapp.com/api/clients', { 
    headers: { 
      Authorization: `Bearer ${token}` 
    } 
  })
  .then((response) => {
    res.send(response.data);
  })
  .catch(() => {
    login();
    token = res.locals.token;
    axios.get('https://dare-nodejs-assessment.herokuapp.com/api/clients', { 
      headers: { 
        Authorization: `Bearer ${token}` 
      } 
    })
    .then((response) => {
      res.send(response.data);
    });
  });
};

const getPolicies = () => (req, res, next) => {
  let token = res.locals.token;
  axios.get('https://dare-nodejs-assessment.herokuapp.com/api/policies', { 
    headers: { 
      Authorization: `Bearer ${token}` 
    } 
  })
  .then((response) => {
    res.send(response.data);
  })
  .catch(() => {
    login();
    token = res.locals.token;
    axios.get('https://dare-nodejs-assessment.herokuapp.com/api/policies', { 
      headers: { 
        Authorization: `Bearer ${token}` 
      } 
    })
    .then((response) => {
      res.send(response.data);
    });
  });
};

const unless = () => (path, middleware) => {
  return (req, res, next) => {
    if (path === req.path) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
};

module.exports = {
  login: login,
  getClients: getClients,
  getPolicies: getPolicies,
  unless: unless
};

