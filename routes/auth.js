const express = require('express');
const router = express.Router();
const axios = require('axios');

let token;

router.post('/login', async (req, res, next) => {
  const data = { 
    client_id: "axa", 
    client_secret: "s3cr3t" 
  };
  axios.post('https://dare-nodejs-assessment.herokuapp.com/api/login', data)
  .then((response) => {
    token = response.data.token;
    res.send(response.data);
  })
  .catch((err) => {
    res.send(err);
  });
});


module.exports = router;
