const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use((err, req, res, next) => {
  console.log('!!!!! (err, req, resp, next) ');
  console.log('err data:\t', err.data);
  if (!err.status) err.status = 500;
  const errEvent = { code: err.status, message: err.message };

  if (err.data) errEvent.data = err.data;

  res.status(err.status).json(errEvent);
});

module.exports = app;
