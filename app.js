const express = require('express');
const router = express.Router()
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');

const helpers = require('./helpers/Middlewares')

const policies = require('./routes/policies');
const clients = require('./routes/clients');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helpers.login());

app.use(helpers.unless()('/policies', helpers.getClients()));
app.use(helpers.unless()('/clients', helpers.getPolicies()));

app.use('/policies', policies);
app.use('/clients', clients);

app.use((req, res, next) => {
  res.status(404).json({ code: 'Not-Found' });
});

app.use((err, req, res, next) => {
  console.error('ERROR', req.method, req.path, err);
  if (!res.headersSent) {
    const statusError = err.status || '500';
    res.status(statusError).json(err);
  }
});

module.exports = app;
