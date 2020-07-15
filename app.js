const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const auth = require('./routes/auth');
const policies = require('./routes/policies');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', auth);
app.use('/policies', policies);

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
