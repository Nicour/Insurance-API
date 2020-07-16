const express = require('express');
const router = express.Router()
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');

const unless = require('./helpers/Middlewares')
const login = require('./helpers/Login')
const clients = require('./helpers/Clients')
const policies = require('./helpers/Policies')

const policiesRoute = require('./routes/policies');
const clientsRoute = require('./routes/clients');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(login());

app.use(unless()('/clients', policies.axiosForPolicies()));
app.use(unless()('/clients', policies.getPolicies()));
app.use(unless()('/policies', clients.axiosForClients()));
app.use(unless()('/policies', clients.getClients()));

app.use('/policies', policiesRoute);
app.use('/clients', clientsRoute);

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
