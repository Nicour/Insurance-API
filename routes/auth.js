const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/login', (req, res, next) => {
  const data = { 
    client_id: "axa", 
    client_secret: "s3cr3t" 
  };
  axios.post('https://dare-nodejs-assessment.herokuapp.com/api/login', data)
  .then((response) => {
    res.send(response.data);
  }).catch((err) => {
    res.send(err);
  });
});

module.exports = router;
