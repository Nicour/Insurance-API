const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res, next) => {
  const { token } = req.headers;
  axios.get('https://dare-nodejs-assessment.herokuapp.com/api/policies', { headers: { Authorization: `Bearer ${token}` } })
  .then((response) => {
    res.send(response.data);
  })
  .catch((err) => {
    if(err.message === "Request failed with status code 401") {
      res.json({ message: "The token is invalid. Please login again to get a new one" });
    }
  });
});

module.exports = router;
